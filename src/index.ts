import { logger } from "./logging/logger.js"
import {scheduleTask} from "./jobs/scheduler.js";

// Тут запускаем весь код

logger("Приложение запущено");
logger("Подключение к базе данных...");
logger("Готово!");

// Тестовая таска
const testTask = scheduleTask("Интервальная таска", 10_000, () => {
    logger("running");
});