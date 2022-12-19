import { eachOfSeries } from "async";
import { IBotContext, IEmployeeProcessor,} from "interfaces";
import { EmployeeRepo, CompanyRepo, VirtualAirlineRepo } from "../repos";
import { Employee, TranslatedEmployee, OnAirRefreshResults, Company, TranslatedCompany, TranslatedVARole, } from "../types";
import { People as OnAirEmployee, Company as OnAirCompany } from "onair-api";
import BaseProcessor from "./BaseProcessor";
import { CompanyProcessor } from ".";
import { VARole, VirtualAirline } from "@prisma/client";

export class EmployeeProcessor extends BaseProcessor implements IEmployeeProcessor {
    Employee: Employee|undefined;
    declare Translated: TranslatedEmployee|undefined;
    declare Input: OnAirEmployee|undefined;

    constructor(input:OnAirEmployee, app: IBotContext) {
        super(app);
        this.Input = input;
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');

        this.process = this.process.bind(this);
    }

    process(): Promise<Employee> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));

            self
            .processEmployee()
            .then(async () => {
                if (!self.Employee) return reject(new Error('No employee processed'));

                self.Logger.debug(`EmployeeProcessor::process::employee::resolve::start`)

                const employee:Employee = await EmployeeRepo.findById(self.Employee.Id, {
                    include: {
                        Company: true,
                        Account: true,
                    }
                });

                self.Logger.debug(`EmployeeProcessor::process::employee::resolve::end`);

                if (!employee) throw new Error('Employee wasn\'t able to be found');
                self.Employee = employee;

                return resolve(self.Employee)
            })
            .catch((err:any) => {
                let msg = `Error processing employee`
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

    // process Employee
    async processEmployee(): Promise<Employee> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('Employee wasn\'t able to be processed'));

            try {
                const x:OnAirEmployee = this.Input;
                let translated:TranslatedEmployee = self.Translators.Employee.translate(x);
                let company:Company|undefined;
                let OnAirEmployeeCompany:OnAirCompany|undefined; 
                
                if (!translated) return reject(new Error('Employee wasn\'t able to be translated'));
                let employee:Employee = await EmployeeRepo.findById(translated.Id);

                if (translated.CompanyId) {
                    company = await CompanyRepo.findById(translated.CompanyId);

                    if (!company) {
                        OnAirEmployeeCompany = await self.App.OnAir.getCompanyDetail(translated.CompanyId) as OnAirCompany;
                        const employeeCompanyProcessor = new CompanyProcessor(OnAirEmployeeCompany, self.App);
                        company = await employeeCompanyProcessor.process();
                    }
                }
                
                if (!employee) {
                    if (translated.CompanyId && translated.Company) {
                        delete translated.CompanyId;
                    }

                    if (translated.CurrentAirportId && translated.CurrentAirport) {
                        delete translated.CurrentAirportId;
                    }

                    if (translated.HomeAirportId && translated.HomeAirport) {
                        delete translated.HomeAirportId;
                    }

                    const query = {
                        ...translated,
                        OnAirSyncedAt: new Date(),
                        Company: {
                            connect: {
                                Id: (company) ? company.Id : translated.CompanyId,
                            }
                        },
                        HomeAirport: (translated.HomeAirportId) ? {
                            connectOrCreate: {
                                where: {
                                    Id: translated.HomeAirportId,
                                },
                                create: self.Translators.Airport.translate(translated.HomeAirport)
                            }
                        } : undefined,
                        CurrentAirport: (translated.CurrentAirportId) ? {
                            connectOrCreate: {
                                where: {
                                    Id: translated.CurrentAirportId,
                                },
                                create: self.Translators.Airport.translate(translated.CurrentAirport)
                            }
                        } : undefined,
                    }
                    
                    employee = await EmployeeRepo.create(query);
                } else {
                    employee.OnAirSyncedAt = new Date();
                    employee = await EmployeeRepo.update(translated.Id, {
                        ...translated,
                        OnAirSyncedAt: new Date(),
                        Company: {
                            connect: {
                                Id: (company) ? company.Id : translated.CompanyId,
                            }
                        },
                        HomeAirport: (translated.HomeAirportId) ? {
                            connectOrCreate: {
                                where: {
                                    Id: translated.HomeAirportId,
                                },
                                create: self.Translators.Airport.translate(translated.HomeAirport)
                            }
                        } : undefined,
                        CurrentAirport: (translated.CurrentAirportId) ? {
                            connectOrCreate: {
                                where: {
                                    Id: translated.CurrentAirportId,
                                },
                                create: self.Translators.Airport.translate(translated.CurrentAirport)
                            }
                        } : undefined,
                    });
                }
                
                if (!employee) return reject(new Error('Employee isn\'t able to be processed'));

                self.Employee = employee;

                return resolve(employee);
            }
            catch (err) {
                console.error(`EmployeeProcessor()::err`, err);
                return reject(err);
            }
        })
    }

}

// export const EmployeeProcessor = new EmployeeProcessor();
