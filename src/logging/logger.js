const config = require('../config');
// Простая функция логгера
// В будущем можно масштабировать до отдельных логгеров

const LogLevel = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warning',
    ERROR: 'error',
    TRACE: 'trace',
}


export class Logger{
    send(message, requestId, logLevel) {
        const timestamp = Date.now();

        if (requestId === undefined) {
            console.log(`[${config.appName} / ${timestamp}] ${logLevel} | ${message}`);
        } else {
            console.log(`[${config.appName} / ${timestamp}] ${logLevel} | ${requestId} - ${message}`);
        }
    }

    // Alias для разного уровня логирования
    debug(message, requestId) {
        this.send(message, requestId, LogLevel.DEBUG);
    }
    trace(message, requestId) {
        this.send(message, requestId, LogLevel.TRACE)
    }
    info(message, requestId) {
        this.send(message, requestId, LogLevel.INFO)
    }
    warn(message, requestId) {
        this.send(message, requestId, LogLevel.WARN)
    }
    error(message, requestId) {
        this.send(message, requestId, LogLevel.ERROR)
    }
}

module.exports = {
    Logger,
    LogLevel
};