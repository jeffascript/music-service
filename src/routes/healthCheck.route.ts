import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
    try {
        res.status(200).send({ message: 'server is alive!' });
    } catch (err) {
        throw Error('Error in health check');
    }
});
export default router;
