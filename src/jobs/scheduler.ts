import { Logger } from "../logging/logger.js";

const logger = new Logger();

logger.info("scheduler запущен");

// Модуль выполняет только одну функцию - запускает интервал и возвращяет его
export function scheduleTask(name: string, interval: number, task: () => void): NodeJS.Timeout {
    logger.info(`Задача "${name}" зарегистрирована (интервал: ${interval} мс)`);

    return setInterval(() => {
        try {
            logger.info(`Задача [${name}] - выполняется...`);
            task();
        } catch (e) {
            logger.error(`Ошибка в выполнении задачи - ${e}`);
        }
    }, interval);
}