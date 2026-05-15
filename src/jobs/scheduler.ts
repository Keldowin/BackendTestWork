const logger = require("./logging/index.js");

logger("scheduler.js запущен");

function scheduleTask(name, interval, task) {
    logger(`Задача "${name}" зарегистрирована (интервал: ${interval} мс)`);

    const timerId = setInterval(() => {
        logger(`Задача [${name}] - выполняется...`);
        task();
    }, interval);

    return timerId;
}

scheduleTask("Interval task", 10_000, () => {
    logger("running");
});

module.exports = { scheduleTask };