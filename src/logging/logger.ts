import {config} from "../config/index.js";

// Простая функция логгера
// В будущем можно масштабировать до отдельных логгеров

export function logger(message: string): void {
    console.log(`[${config.appName}] ${message}`);
}