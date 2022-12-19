import { eachOfSeries } from "async";
import { IBotContext, INotificationProcessor, } from "interfaces";
import { CompanyRepo, EmployeeRepo, NotificationRepo, } from "../repos";
import { Notification, TranslatedNotification, NotificationProcessorOptions, OnAirRefreshResults, QueryOptions, Company, Employee, } from "../types";
import { Notification as OnAirNotification, } from "onair-api";

import { BaseProcessor } from "./BaseProcessor";
import { Prisma, VirtualAirline } from "@prisma/client";
import { AircraftProcessor, EmployeeProcessor, FlightProcessor } from ".";

export class NotificationProcessor extends BaseProcessor implements INotificationProcessor {
    Notification: Notification|undefined;
    declare Translated: TranslatedNotification|undefined;
    declare Input: OnAirNotification|undefined;
    declare Created: boolean|undefined;
    declare Updated: boolean|undefined;

    constructor(input:OnAirNotification|undefined, app: IBotContext) {
        super(app);
        if (input) {
            this.Input = input;
        }
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');
        this.process = this.process.bind(this);
    }

    process(opts?:NotificationProcessorOptions): Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));
            self.Logger.debug(`NotificationProcessor::process::start`)

            return self
            .processNotification(opts)
            .then(async ({ error, success, created, updated, results, }) => {
                if (!self.Notification) return reject(new Error('No notification processed'));
                if (error || !success) return reject(error);
                let Id:string = results.Id;

                const queryOpts:QueryOptions = {
                    ...opts,
                    include: {
                        VirtualAirline: true,
                        Company: true,
                        Employee: true,
                        ...opts?.include,
                    }
                }

                let msg:string = `NotificationProcessor::process::end::`
                if (created) {
                    msg += `created Notification ${results.Id}`
                } else if (updated) {
                    msg += `updated Notification ${results.Id}`
                }

                self.Logger.debug(msg)

                if (!Id) return reject(new Error('No Id provided'));

                const notification:Notification = await NotificationRepo.findById(Id, queryOpts);
                if (!notification) throw new Error('Notification wasn\'t able to be found');
                
                self.Notification = notification;

                return resolve({
                    success: true,
                    created: created,
                    updated: updated,
                    results: self.Notification,
                    error: error,
                })
            })
            .catch((err:any) => {
                let msg = `Error processing notification`
                if (err) {
                    const { error, record } = err;
                    const errorMessage = error instanceof Error ? error.message : error;
                    msg += ` err: ${errorMessage}`;
                }
                
                this.Logger.error(msg);
                return reject(err)
            });
        });
    }

    // process Notification
    async processNotification(opts?:NotificationProcessorOptions): Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('Notification wasn\'t able to be processed'));

            const x:OnAirNotification = this.Input;
            let notification:Notification|undefined;
            let translated:TranslatedNotification|undefined;
            
            // first check if the notification exists in the database by Id
            notification = await NotificationRepo.findById(x.Id);
            
            if (opts?.translate) {
                translated = self.Translators.Notification.translate(x);
            }

            // if no notification exists
            if (!notification) {
                // if create is true, create the notification
                if (opts?.create) {
                    // if translate is true, create the translated notification
                    const createInput:TranslatedNotification|undefined = translated;
                    if (!createInput) return reject(new Error(`OnAir Notification ${x} wasn't able to be translated.`));
                    
                    let create:Prisma.NotificationCreateInput = {
                        Id: createInput.Id,
                        IsRead: createInput.IsRead,
                        IsNotification: createInput.IsNotification,
                        ZuluEventTime: new Date(createInput.ZuluEventTime),
                        CategoryId: createInput.CategoryId,
                        ActionId: createInput.ActionId,
                        Description: createInput.Description,
                        Amount: createInput.Amount,
                        VirtualAirline: {
                            connect: {
                                Id: createInput.VirtualAirlineId,
                            },
                        },
                    }

                    // if the Company doesnt exist, try to determine it by reading the Description
                    if (!create.Company) {
                        // determine if the notification is a new Logistic Query Job by splitting the Description by spaces and taking the 5th word.
                        if (create.Description.includes('Job Logistic Query taken by')) {
                            const descriptionSplit = create.Description.split(' ');
                            let inferredCompany:Company = await CompanyRepo.findByAirlineCode(descriptionSplit[5], {
                                serialize: true,
                                include: {
                                    VirtualAirline: true,
                                    Owner: {
                                        include: {
                                            Employee: true,
                                            Company: true,
                                        },
                                    },
                                    
                                },
                            });

                            // if the Company exists, we can connect it to the Notification
                            if (inferredCompany) {
                                create = {
                                    ...create,
                                    Company: {
                                        connect: {
                                            Id: inferredCompany.Id,
                                        },
                                    },
                                }
                            }
                        // otherwise if the Notification Description starts with the word 'Job finished', try to determine the Company by splitting the passed EmployeeId field
                        } else if (create.Description.includes('Job finished ')) {
                            if (createInput.EmployeeId) {
                                const employee = await EmployeeRepo.findById(createInput.EmployeeId, {
                                    serialize: true,
                                    include: {
                                        Company: true,
                                        Account: true,
                                    },
                                });

                                if (employee) {
                                    create = {
                                        ...create,
                                        Employee: {
                                            connect: {
                                                Id: employee.Id,
                                            },
                                        },
                                    }

                                    if (!create.Company) {
                                        create = {
                                            ...create,
                                            Company: {
                                                connect: {
                                                    Id: employee.CompanyId,
                                                },
                                            },
                                        }
                                    }
                                } else if (createInput.EmployeeId) {
                                    const oaEmployee = await self.App.OnAir.getEmployeeDetail(createInput.EmployeeId);
                                    if (!oaEmployee) {
                                        self.Logger.warn(`OnAir Employee ${createInput.EmployeeId} wasn't able to be found.`);
                                    } else {
                                        const employeeProcessor = new EmployeeProcessor(oaEmployee, self.App);
                                        const employee:Employee = await employeeProcessor.process();

                                        if (employee) {
                                            create = {
                                                ...create,
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }

                    if (createInput.AircraftId) {
                        const oaAircraft = await self.App.OnAir.getAircraftDetail(createInput.AircraftId);
                        if (!oaAircraft) {
                            self.Logger.warn(`OnAir Aircraft ${createInput.AircraftId} wasn't able to be found.`);
                        } else {
                            const aircraftProcessor = new AircraftProcessor(oaAircraft, self.App);

                            const aircraft = await aircraftProcessor.process();
                            if (aircraft) {
                                create = {
                                    ...create,
                                    Aircraft: {
                                        connect: {
                                            Id: aircraft.results.Id,
                                        },
                                    },
                                }
                            }
                        }
                    }

                    if (createInput.FlightId) {
                        const oaFlight = await self.App.OnAir.getFlightDetail(createInput.FlightId);
                        if (!oaFlight) {
                            self.Logger.warn(`OnAir Flight ${createInput.FlightId} wasn't able to be found.`);
                        } else {
                            const flightProcessor = new FlightProcessor(oaFlight, self.App);
                            const flight = await flightProcessor.process();

                            if (flight) {
                                create = {
                                    ...create,
                                    Flight: {
                                        connect: {
                                            Id: flight.Id,
                                        },
                                    },
                                }
                            }
                        }
                    }
                    
                    notification = await NotificationRepo.create(create);
                    self.Created = true;
                }
            } else {
                // if update is true, update the notification
                if (opts?.update) {
                    // if translate is true, update the translated notification
                    const updateInput:TranslatedNotification|undefined = translated;
                    if (!updateInput) return reject(new Error(`OnAir Notification ${x} wasn't able to be updated.`));
                    if (updateInput.VirtualAirlineId) {
                        delete updateInput.VirtualAirlineId;
                    }

                    notification = await NotificationRepo.update(notification.Id, {
                        ...updateInput,
                    });

                    self.Updated = true;
                }
            }
            
            if (!notification) return reject(new Error(`OnAir Notification ${x} wasn't able to be processed.`));

            self.Notification = notification;

            const results:OnAirRefreshResults = {
                created: self.Created,
                updated: self.Updated,
                results: self.Notification,
                success: true,
            }

            return resolve(results);
        })
    }

}

// export const NotificationProcessor = new NotificationProcessor();
