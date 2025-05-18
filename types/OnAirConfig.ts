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

export type OnAirStatusType = {
    enabled: boolean;
    interval: number;
    channelId: string|null|undefined;
    sortColumn?: string;
    pageSize?: number;
}

export type OnAirStatus = {
    fleet?: OnAirStatusType;
    flights?: OnAirStatusType;
    fbos?: OnAirStatusType;
    members?: OnAirStatusType;
    detail?: OnAirStatusType;
}

export type OnAirOperationMode = 'VA' | 'Company';

export type OnAirCommandConfig = {
    enabled: boolean;
}

export type OnAirCommandsConfig = {
    aircraft: OnAirCommandConfig;
    airport: OnAirCommandConfig;
    detail: OnAirCommandConfig;
    fbo: OnAirCommandConfig;
    fboJobs: OnAirCommandConfig;
    fbos: OnAirCommandConfig;
    fleet: OnAirCommandConfig;
    flights: OnAirCommandConfig;
    jobs: OnAirCommandConfig;
    members: OnAirCommandConfig;
}

export type OnAirConfig = {
    keys: OnAirApiConfig;
    enabled: boolean;
    status?: OnAirStatus;
    opMode?: OnAirOperationMode;
    enabledCommands: string[];
    sorting: {
        Members: string[];
        Flights: string[];
        Jobs: string[];
    },
}
