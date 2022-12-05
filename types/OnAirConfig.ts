import { Guid } from 'onair-api/dist/types/Guid';
import { OnAirEventConfig, OnAirPollingConfig } from '.';

export interface OnAirApiConfig {
    apiKey: Guid;
    companyId: Guid;
    vaId: Guid;
}

export type OnAirApiQueryOptions = {
    filter?: {
        aircraftCode?: string;
        companyCode?: string;
        showcompleted?: boolean;
    };
    sortBy?: string;
    sortOrder?: string;
}

export type OnAirConfig = {
    keys: OnAirApiConfig;
    enabled: boolean;
    refreshOnStartup: boolean;
    events: {
        VADetails: OnAirEventConfig;
        VAFleet: OnAirEventConfig;
        VAJobs: OnAirEventConfig;
        VANotifications: OnAirEventConfig;
    };
    sorting: {
        Members: string[]|boolean;
        Flights: string[]|boolean;
        Jobs: string[]|boolean;
    },
    polling: {
        VADetails: OnAirPollingConfig;
        VAJobs: OnAirPollingConfig;
        VAFleet: OnAirPollingConfig;
        VANotifications: OnAirPollingConfig;
    };
}
