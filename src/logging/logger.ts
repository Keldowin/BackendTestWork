import {config} from "../config/index.js";
import {type ILogger, LogLevel} from "./logger.types.js";

// Простая функция логгера
// В будущем можно масштабировать до отдельных логгеров

export class Logger implements ILogger {
    send(message: string, requestId?: string, logLevel: LogLevel = LogLevel.INFO): void {
        const timestamp: number = Date.now();

        if (requestId === undefined) {
            console.log(`[${config.appName} / ${timestamp}] ${logLevel} | ${message}`);
        } else {
            console.log(`[${config.appName} / ${timestamp}] ${logLevel} | ${requestId} - ${message}`);
        }
    }

    // Alias для разного уровня логирования
    debug(message: string, requestId?: string): void {
        this.send(message, requestId, LogLevel.DEBUG);
    }
    trace(message: string, requestId?: string): void {
        this.send(message, requestId, LogLevel.TRACE)
    }
    info(message: string, requestId?: string): void {
        this.send(message, requestId, LogLevel.INFO)
    }
    warn(message: string, requestId?: string): void {
        this.send(message, requestId, LogLevel.WARN)
    }
    error(message: string, requestId?: string): void {
        this.send(message, requestId, LogLevel.ERROR)
    }
}