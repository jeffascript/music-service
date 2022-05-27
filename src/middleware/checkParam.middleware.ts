/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpExceptions';
import { HTTP400Error } from '../errors/httpErrors';

export const checkReqParam = (req: Request, _: Response, next: NextFunction) => {
    if (!req.params.mbid) {
        const error = new HTTP400Error('Missing mbid search string');
        const { statusCode } = error;
        next(new HttpException(statusCode, error.message));
    } else {
        next();
    }
};
