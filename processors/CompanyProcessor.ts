import { eachOfSeries } from "async";
import { IBotContext, ICompanyProcessor,} from "interfaces";
import { CompanyRepo, VirtualAirlineRepo } from "../repos";
import { Company, TranslatedCompany, OnAirRefreshResults, } from "../types";
import { Company as OnAirCompany, } from "onair-api";

import BaseProcessor from "./BaseProcessor";
import { VirtualAirline } from "@prisma/client";

export class CompanyProcessor extends BaseProcessor implements ICompanyProcessor {
    Company: Company|undefined;
    declare Translated: TranslatedCompany|undefined;
    declare Input: OnAirCompany|undefined;

    constructor(input:OnAirCompany, app: IBotContext) {
        super(app);
        this.Input = input;
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');

        this.process = this.process.bind(this);
    }

    process(): Promise<Company> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));

            self
            .processCompany()
            .then(async () => {
                if (!self.Company) return reject(new Error('No company processed'));

                self.Logger.debug(`CompanyProcessor::process::company::resolve::start`)

                const company:Company = await CompanyRepo.findById(self.Company.Id, {
                    include: {
                        Company: true,
                        VARole: true,
                        VirtualAirline: true,
                    }
                });

                self.Logger.debug(`CompanyProcessor::process::company::resolve::end`);

                if (!company) throw new Error('Company wasn\'t able to be found');
                self.Company = company;

                return resolve(self.Company)
            })
            .catch((err:any) => {
                let msg = `Error processing company`
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

    // process Company
    async processCompany(): Promise<Company> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('Company wasn\'t able to be processed'));

            try {
                const x:OnAirCompany = this.Input;
                let translated:TranslatedCompany = self.Translators.Company.translate(x);
                
                if (!translated) return reject(new Error('Company wasn\'t able to be translated'));
                
                let company:Company = await CompanyRepo.findById(translated.Id);
                
                const OnAirCompanyCompany:OnAirCompany = await self.App.OnAir.getCompanyDetail(x.Id) as OnAirCompany;
                const translatedCompany:TranslatedCompany = self.App.OnAir.Translators.Company.translate(OnAirCompanyCompany);

                if (!company) {
                    delete translated.WorldId;
                    company = await CompanyRepo.create({
                        ...translated,
                        OnAirSyncedAt: new Date(),
                        VirtualAirline: {
                            connect: {
                                Id: self.App.config.onair.keys.vaId,
                            }
                        }
                    });
                } else {
                    company.OnAirSyncedAt = new Date();
                    company = await CompanyRepo.update(translated.Id, {
                        ...translated,
                        OnAirSyncedAt: new Date(),
                        VirtualAirline: {
                            connect: {
                                Id: self.App.config.onair.keys.vaId,
                            }
                        }
                    });
                }
                if (!company) return reject(new Error('Company isn\'t able to be processed'));

                self.Company = company;

                return resolve(company);
            }
            catch (err) {
                console.error(`CompanyProcessor()::err`, err);
                return reject(err);
            }
        })
    }

}

// export const CompanyProcessor = new CompanyProcessor();
