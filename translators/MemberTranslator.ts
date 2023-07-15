import { Member as OnAirMember, } from 'onair-api';
import { Prisma } from '@prisma/client';
import { IBotContext } from '@/interfaces';
import { BaseTranslator } from './BaseTranslator';
import { ITranslator } from '@/interfaces/ITranslator';

export class MemberTranslator extends BaseTranslator<OnAirMember, Prisma.MemberCreateInput> implements ITranslator<OnAirMember, Prisma.MemberCreateInput>{    
    constructor(app:IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(x:OnAirMember):Prisma.MemberCreateInput {
        if (!x) throw new Error('Input is required');
        if (!this.App) throw new Error('App is required');

        const vaId:string = this.App.config.onair.keys.vaId;

        const output:Prisma.MemberCreateInput = {
            Id: x.Id,
            TotalCargosTransportedLbs: x.TotalCargosTransportedLbs,
            TotalPAXsTransported: x.TotalPAXsTransported,
            TotalEarnedCredits: x.TotalEarnedCredits,
            TotalSpentCredits: x.TotalSpentCredits,
            NumberOfFlights: x.NumberOfFlights,
            FlightHours: x.FlightHours,
            Color: x.Color,
            ReputationImpact: x.ReputationImpact,
            LastWeeklyPay: (x.LastWeeklyPay) ? new Date(x.LastWeeklyPay) : undefined,
            VirtualAirline: {
                connect: {
                    Id: vaId
                }
            },
            VARole: {
                connectOrCreate: {
                    where: {
                        Id: x.VARoleId
                    },
                    create: this.Translators.VARole.translate(x.VARole)
                }
            },
            Company: {
                connectOrCreate: {
                    where: {
                        Id: x.CompanyId
                    },
                    create: this.Translators.Company.translate(x.Company)
                }
            }
        };

        return output;
    }
}
