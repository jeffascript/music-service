/* eslint-disable max-classes-per-file */

export abstract class HTTPClientError extends Error {
    readonly statusCode!: number;

    readonly name!: string;

    constructor(message: Record<string, unknown> | string) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        } else {
            super(message);
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;

    constructor(message: string | Record<string, unknown> = 'Bad Request') {
        super(message);
    }
}

export class HTTP401Error extends HTTPClientError {
    readonly statusCode = 401;

    constructor(message: string | Record<string, unknown> = 'Unauthorized') {
        super(message);
    }
}

export class HTTP403Error extends HTTPClientError {
    readonly statusCode = 403;

    constructor(message: string | Record<string, unknown> = 'Forbidden') {
        super(message);
    }
}

export class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;

    constructor(message: string | Record<string, unknown> = 'Not found') {
        super(message);
    }
}

export class HTTP500Error extends HTTPClientError {
    readonly statusCode = 500;

    constructor(message: string | Record<string, unknown> = 'Server Error') {
        super(message);
    }
}
