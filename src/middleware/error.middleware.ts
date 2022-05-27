/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import HttpException from '../exceptions/HttpExceptions';

function errorMiddleware(error: HttpException, request: Request, response: Response) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
