import { logger } from "./logging/logger.js"
import {scheduleTask} from "./jobs/scheduler.js";
import {CustomError, SchedulerError} from "./exceptions/index.js";

// Тут запускаем весь код

logger("Приложение запущено");
logger("Подключение к базе данных...");
logger("Готово!");

// Тестовая таска
const testTask = scheduleTask("Интервальная таска", 10_000, () => {
    logger("running");
});

// Тест кастомных ошибок
const err1 = new CustomError("Кастомная ошибка")
const err2 = new SchedulerError("Ошибка таски", "id_1")

console.log(err1, err2)