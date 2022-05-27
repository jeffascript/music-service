import express from 'express';

import ArtistController from '../controllers/artist.controller';
import { redisCacheHandler } from '../middleware/checkCache.middleware';
import { checkReqParam } from '../middleware/checkParam.middleware';

const router = express.Router();

router.get('/:mbid', checkReqParam, redisCacheHandler, ArtistController.findByMBID);

export default router;
