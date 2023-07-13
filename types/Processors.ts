import { IProcessor } from '../interfaces';

export type Processors = {
    Aircraft?: IProcessor
    VirtualAirline?: IProcessor;
}

export type ProcessorError = Error & {
    message: string;
    stack: string;
    name: string;
    code: string;
    processor: string;
    severity: string;
    data: unknown;
};

export type ProcessorErrorConstructor = new (message: string, data?: unknown) => ProcessorError;
