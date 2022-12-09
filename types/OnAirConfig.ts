import { OnAirEventConfig, OnAirPollingConfig } from '.';

export interface OnAirApiConfig {
    apiKey: string;
    companyId: string;
    vaId: string;
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

export type OnAirEventsConfig = {
    VirtualAirline: OnAirEventConfig;
    VAFleet: OnAirEventConfig;
    VAJobs: OnAirEventConfig;
    VANotifications: OnAirEventConfig;
}

export type OnAirPollingsConfig = {
    VirtualAirline: OnAirPollingConfig;
    VAJobs: OnAirPollingConfig;
    VAFleet: OnAirPollingConfig;
    VANotifications: OnAirPollingConfig;
};

export type OnAirConfig = {
    keys: OnAirApiConfig;
    enabled: boolean;
    refreshOnStartup: boolean;
    loadOnStartup: boolean;
    events: OnAirEventsConfig;
    sorting: {
        Members: string[]|boolean;
        Flights: string[]|boolean;
        Jobs: string[]|boolean;
    },
    polling: OnAirPollingsConfig;
}
