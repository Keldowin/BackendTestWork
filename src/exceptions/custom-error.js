// Пример кастомной ошбики
export class CustomError extends Error {
    timestamp

    constructor(message) {
        super(message);
        this.timestamp = Date.now();
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}