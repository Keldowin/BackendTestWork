// Конфиг файл теперь подтягивает с .env
import dotenv from 'dotenv';

dotenv.config();

interface Config {
    appName: string;
    version: string;
    env: "dev" | "prod" | "test";
    port: number;
}

export const config: Config = {
    appName: process.env.APP_NAME ?? "TestProject",
    version: process.env.APP_VERSION ?? "1.0.0",
    env: (process.env.CONFIG as Config["env"]) ?? "dev",
    port: Number(process.env.PORT) ?? 3000,
};