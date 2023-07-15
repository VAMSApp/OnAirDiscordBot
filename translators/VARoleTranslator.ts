import { VARole as OnAirVARole, } from 'onair-api';
import { Prisma } from '@prisma/client';
import { IBotContext } from '@/interfaces';
import { BaseTranslator } from './BaseTranslator';
import { ITranslator } from '@/interfaces/ITranslator';

export class VARoleTranslator extends BaseTranslator<OnAirVARole, Prisma.VARoleCreateInput> implements ITranslator<OnAirVARole, Prisma.VARoleCreateInput> {    
    constructor(app:IBotContext) {
        super(app);

        this.translate = this.translate.bind(this);
    }

    translate(x:OnAirVARole):Prisma.VARoleCreateInput {
        if (!x) throw new Error('Input is required');
        if (!this.App) throw new Error('App is required');

        const vaId:string = this.App.config.onair.keys.vaId;

        const output:Prisma.VARoleCreateInput = {
            Id: x.Id,
            Name: x.Name,
            Permission: x.Permission,
            IsDefaultNewRole: x.IsDefaultNewRole,
            Color: x.Color,
            PayPercent: x.PayPercent,
            IsHidden: x.IsHidden,
            RestrictLoadingVAJobsIntoNonVAAircraft: x.RestrictLoadingVAJobsIntoNonVAAircraft,
            RestrictLoadingNonVAJobsIntoVAAircraft: x.RestrictLoadingNonVAJobsIntoVAAircraft,
            PayWeekly: x.PayWeekly,
            PayPerFlightHour: x.PayPerFlightHour,
            VirtualAirline: {
                connect: {
                    Id: vaId
                }
            }
        };

        return output;
    }
}
