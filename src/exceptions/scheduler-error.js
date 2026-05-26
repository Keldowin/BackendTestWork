export class SchedulerError extends Error {
    id

    constructor(message, schedulerId) {
        super(message);
        this.id = schedulerId;
        Object.setPrototypeOf(this, SchedulerError.prototype);
    }
}