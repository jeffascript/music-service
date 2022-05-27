/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { getRedisCacheAsync } from '../utils/redis';

export const redisCacheHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { mbid } = req.params;
    const cacheKey = JSON.stringify(mbid);

    const cacheValue = await getRedisCacheAsync(cacheKey);

    if (cacheValue && cacheValue !== null) {
        console.log('Getting data from Cache ... ');

        const response = JSON.parse(cacheValue);
        return res.send(response);
    }
    console.log('Not  from Cache :( ');
    next();
};

export const middleware = {
    redisCacheHandler,
};
