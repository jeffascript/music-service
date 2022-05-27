import { Request, Response, NextFunction } from 'express';
import { HTTP500Error, HTTP400Error } from '../errors/httpErrors';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import HttpException from '../exceptions/HttpExceptions';

export const checkReqParam = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.mbid) {
            const error = new HTTP400Error('Missing mbid search string');
            const { statusCode } = error;
            next(new HttpException(statusCode, error.message));
        } else {
            next();
        }
    } catch (err) {
        const error = new HTTP500Error('Missing mbid search string');
        const { statusCode } = error;
        next(new HttpException(statusCode, error.message));
    }
};
