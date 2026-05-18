export class SchedulerError extends Error {
    id: string;

    constructor(message: string, schedulerId: string) {
        super(message);
        this.id = schedulerId;
        Object.setPrototypeOf(this, SchedulerError.prototype);
    }
}