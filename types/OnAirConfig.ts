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
    VAJob: OnAirEventConfig;
    VANotification: OnAirEventConfig;
    VAMember: OnAirEventConfig;
}

export type OnAirPollingsConfig = {
    VirtualAirline: OnAirPollingConfig;
    VAJobs: OnAirPollingConfig;
    VAFleet: OnAirPollingConfig;
    VANotifications: OnAirPollingConfig;
    VAMembers: OnAirPollingConfig;
};

export type OnAirConfig = {
    keys: OnAirApiConfig;
    enabled: boolean;
    status: {
        fleet: {
            enabled: boolean,
            interval: number;
            channelId: string|null;
        },
        flights: {
            enabled: boolean,
            interval: number;
            channelId: string|null;
        }
    },
    sorting: {
        Members: string[];
        Flights: string[];
        Jobs: string[];
    },
}
