import {logger} from "../logging/logger.js";

logger("scheduler запущен");

// Модуль выполняет только одну функцию - запускает интервал и возвращяет его
export function scheduleTask(name: string, interval: number, task: () => void): NodeJS.Timeout {
    logger(`Задача "${name}" зарегистрирована (интервал: ${interval} мс)`);

    return setInterval(() => {
        logger(`Задача [${name}] - выполняется...`);
        task();
    }, interval);
}