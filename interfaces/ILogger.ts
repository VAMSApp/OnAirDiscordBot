

export interface ILogger {
    emerg: (message: string) => void;
    alert: (message: string) => void;
    crit: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
    notice: (message: string) => void;
    info: (message: string) => void;
    debug: (message: string) => void;
    setLevel:(level: string) => void;
}
