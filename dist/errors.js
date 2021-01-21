export class ValidationError extends Error {
    constructor(message, key) {
        super(key ? `${message} in ${key}` : message);
        this.key = key;
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
//# sourceMappingURL=errors.js.map