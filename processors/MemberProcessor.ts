import { eachOfSeries } from "async";
import { IBotContext, IMemberProcessor,} from "interfaces";
import { MemberRepo, CompanyRepo, VirtualAirlineRepo } from "../repos";
import { Member, TranslatedMember, OnAirRefreshResults, Company, TranslatedCompany, TranslatedVARole, } from "../types";
import { Member as OnAirMember, Company as OnAirCompany } from "onair-api";
import BaseProcessor from "./BaseProcessor";
import { CompanyProcessor } from ".";
import { VARole, VirtualAirline } from "@prisma/client";

export class MemberProcessor extends BaseProcessor implements IMemberProcessor {
    Member: Member|undefined;
    declare Translated: TranslatedMember|undefined;
    declare Input: OnAirMember|undefined;
    declare Created: boolean|undefined;
    declare Updated: boolean|undefined;

    constructor(input:OnAirMember, app: IBotContext) {
        super(app);
        this.Input = input;
        
        if (!this.Translators) throw new Error('Translators aren\'t defined');

        this.process = this.process.bind(this);
    }

    process(): Promise<OnAirRefreshResults> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!self.Input) return reject(new Error('No input provided'));

            self
            .processMember()
            .then(async () => {
                if (!self.Member) return reject(new Error('No member processed'));

                self.Logger.debug(`MemberProcessor::process::member::resolve::start`)

                const member:Member = await MemberRepo.findById(self.Member.Id, {
                    include: {
                        Company: true,
                        VARole: true,
                        VirtualAirline: true,
                    }
                });

                self.Logger.debug(`MemberProcessor::process::member::resolve::end`);

                if (!member) throw new Error('Member wasn\'t able to be found');
                self.Member = member;

                const results:OnAirRefreshResults = {
                    results: self.Member,
                    created: self.Created,
                    updated: self.Updated,
                    success: true,
                }

                return resolve(results)
            })
            .catch((err:any) => {
                let msg = `Error processing member`
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

    // process Member
    async processMember(): Promise<Member> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.Input) return reject(new Error('Member wasn\'t able to be processed'));

            try {
                const x:OnAirMember = this.Input;
                let translated:TranslatedMember = self.Translators.Member.translate(x);
                let company:Company|undefined;
                let OnAirMemberCompany:OnAirCompany|undefined; 
                
                if (!translated) return reject(new Error('Member wasn\'t able to be translated'));
                let member:Member = await MemberRepo.findById(translated.Id);

                if (translated.CompanyId) {
                    company = await CompanyRepo.findById(translated.CompanyId);

                    if (!company) {
                        OnAirMemberCompany = await self.App.OnAir.getCompanyDetail(translated.CompanyId) as OnAirCompany;
                        const memberCompanyProcessor = new CompanyProcessor(OnAirMemberCompany, self.App);
                        company = await memberCompanyProcessor.process();
                    }
                }

                let va:VirtualAirline = await VirtualAirlineRepo.findById(self.App.config.onair.keys.vaId);
                if (!va) return reject(new Error('Virtual Airline wasn\'t able to be found in the database'));
                
                const translatedVARole:TranslatedVARole|undefined = self.App.OnAir.Translators.VARole.translate(x.VARole);
                
                if (!member) {
                    member = await MemberRepo.create({
                        ...translated,
                        OnAirSyncedAt: new Date(),
                        Company: {
                            connect: {
                                Id: (company) ? company.Id : translated.CompanyId,
                            }
                        },
                        VirtualAirline: {
                            connect: {
                                Id: self.App.config.onair.keys.vaId,
                            }
                        },
                        VARole: {
                            connectOrCreate: {
                                where: {
                                    Id: translated.VARoleId,
                                },
                                create: {
                                    ...translatedVARole,
                                    OnAirSyncedAt: new Date(),
                                }
                            }
                        }
                    });
                    self.Created = true;
                } else {
                    member.OnAirSyncedAt = new Date();
                    member = await MemberRepo.update(translated.Id, {
                        ...translated,
                        OnAirSyncedAt: new Date(),
                        Company: {
                            connect: {
                                Id: (company) ? company.Id : translated.CompanyId,
                            }
                        },
                        VirtualAirline: {
                            connect: {
                                Id: self.App.config.onair.keys.vaId,
                            }
                        },
                        VARole: {
                            connectOrCreate: {
                                where: {
                                    Id: translated.VARoleId,
                                },
                                create: {
                                    ...translatedVARole,
                                    OnAirSyncedAt: new Date(),
                                }
                            }
                        }
                    });
                    self.Updated = true;
                }
                
                if (!member) return reject(new Error('Member isn\'t able to be processed'));

                self.Member = member;

                return resolve(member);
            }
            catch (err) {
                console.error(`MemberProcessor()::err`, err);
                return reject(err);
            }
        })
    }

}

// export const MemberProcessor = new MemberProcessor();
