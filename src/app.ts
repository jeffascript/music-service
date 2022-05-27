import express, { Application, Request, Response, NextFunction } from 'express';

import cors from 'cors';
import { Routes } from './routes';
import errorMiddleware from './middleware/error.middleware';

class App {
    public app: Application;

    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.initializeErrorHandling();
    }

    private config(): void {
        this.app.use((_: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default new App().app;
