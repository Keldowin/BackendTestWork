// Пример кастомной ошбики
export class CustomError extends Error {
    timestamp: number;

    constructor(message: string) {
        super(message);
        this.timestamp = Date.now();
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}