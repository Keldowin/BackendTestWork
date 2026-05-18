import { Logger } from "./logging/logger.js"
import {scheduleTask} from "./jobs/scheduler.js";
import {CustomError, SchedulerError} from "./exceptions/index.js";

// Тут запускаем весь код

const logger = new Logger()

logger.info("Приложение запущено");
logger.info("Подключение к базе данных...");
logger.info("Готово!");

// Тестовая таска
const testTask = scheduleTask("Интервальная таска", 10_000, () => {
    logger.debug("running task", "req1");
});

// Тест кастомных ошибок
const err1 = new CustomError("Кастомная ошибка")
const err2 = new SchedulerError("Ошибка таски", "id_1")

logger.error("Ошибка!")
console.log(err1, err2)
