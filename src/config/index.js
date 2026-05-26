// Конфиг файл теперь подтягивает с .env
import dotenv from 'dotenv';

dotenv.config();

const config = {
    appName: process.env.APP_NAME ?? "TestProject",
    version: process.env.APP_VERSION ?? "1.0.0",
    env: (process.env.CONFIG) ?? "dev",
    port: (process.env.PORT) ?? 3000,
};

module.exports = config;