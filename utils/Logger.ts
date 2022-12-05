import * as winston from 'winston';
import { LoggerConfig } from '../types/LoggerConfig';
import { ILogger } from '../interfaces/ILogger';

const { combine, timestamp, printf, } = winston.format;

class Logger implements ILogger {
    private logger: winston.Logger | undefined;

    private Config = {
        logLevel: 'info',
        logToConsole: false,
    }

    constructor(cfg?:LoggerConfig) {
        this.Config = {
            ...this.Config,
            ...cfg
        };

        this.initialize();

        this.debug = this.debug.bind(this);
        this.info = this.info.bind(this);
        this.notice = this.notice.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);

    }

    private consoleFormat = printf(({ level, message, }) => {
        return `[${level}]: ${message}`;
    });

    // public colorize(level: string, message: string) {
    //     switch (level) {
    //         case 'debug':
    //             return chalk.blue(message);
    //         case 'info':
    //             return chalk.green(message);
    //         case 'warn':
    //             return chalk.yellow(message);
    //         case 'error':
    //             return chalk.red(message);
    //         default:
    //             return message;
    //     }
    // }

    public setLevel(level: string) {
        if (this.logger === undefined) this.initialize();
        this.Config.logLevel = level;
    }

    private initialize() {
        if (this.logger) return;

        const consoleTransport = new winston.transports.Console({
            level: this.Config.logLevel,
            format: combine(
                timestamp(),
                this.consoleFormat
            )
        });

        
        winston.addColors({
            notice: 'blue',
            warning: 'yellow',
            error: 'red',
            emerg: 'red',
            crit: 'red',
            alert: 'red',
        });

        this.logger = winston.createLogger({
            level: this.Config.logLevel,
            levels: {
                emerg: 0,
                alert: 1,
                crit: 2,
                error: 3,
                warning: 4,
                notice: 5,
                info: 6,
                debug: 7
            },
            format: combine(
                timestamp(),
                winston.format.splat(),
                this.consoleFormat
            ),
            transports: [consoleTransport]
        });

    }

    public emerg(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.emerg(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.emerg(message, meta);
        }
    }

    public alert(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.alert(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.alert(message, meta);
        }
    }

    public crit(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.crit(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.crit(message, meta);
        }
    }

    public error(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.error(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.error(message, meta);
        }
    }

    public warn(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.warn(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.warn(message, meta);
        }
    }

    public notice(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.info(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.log('notice', message, meta);
        }
    }

    public info(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.info(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.info(message, meta);
        }
    }

    public debug(message: string, ...meta: any[]) {
        if (this.logger === undefined) {
            this.initialize();
            this.debug(message, meta);
        } else {
            if (this.Config.logToConsole === false) return;
            this.logger.debug(message, meta);
        }
    }

}

export default Logger;
