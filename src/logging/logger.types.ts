export enum LogLevel {
    DEBUG = 'Debug',
    TRACE = 'Trace',
    INFO = 'Info',
    WARN = 'Warning',
    ERROR = 'Error',
}

export interface ILogger {
    send(message: string, requestId?: string, logLevel?: LogLevel): void;
    debug(message: string, requestId?: string): void;
    trace(message: string, requestId?: string): void;
    info(message: string, requestId?: string): void;
    warn(message: string, requestId?: string): void;
    error(message: string, requestId?: string): void;
}