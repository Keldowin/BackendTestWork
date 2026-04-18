const logger = require("./src/logger");
const { scheduleTask } = require("./src/scheduler");

logger("Приложение запущено");
logger("Подключение к базе данных...");
logger("Готово!");