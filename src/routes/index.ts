import { Application, Router } from 'express';
import ArtistRouter from './artist.route';
import HealthCheckRouter from './healthCheck.route';

interface IRoute {
    path: string;
    route: Router;
}

const defaultIRoute: IRoute[] = [
    {
        path: '/musify/music-artist/details/',
        route: ArtistRouter,
    },
    {
        path: '/_status',
        route: HealthCheckRouter,
    },
];

export class Routes {
    public routes(app: Application): void {
        defaultIRoute.forEach(({ path, route }) => {
            app.use(path, route);
        });
    }
}
