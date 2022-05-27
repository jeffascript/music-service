import redis from 'redis';
import { promisify } from 'util';
import configuration from '../config';

// compare with this docs: https://github.com/NodeRedis/node-redis
// const redisUrlWithPort = 'redis://redis:6379';
const redisUrlWithPort = configuration.REDIS_PORT || 'redis://127.0.0.1:6379';
export const redisClient = redis.createClient(redisUrlWithPort);
export const cacheExpiration = Math.floor(2 * 24 * 60 * 60); // 2 days

redisClient.on('error', (err) => {
    throw err;
});

export const getRedisCacheAsync = promisify(redisClient.get).bind(redisClient);
