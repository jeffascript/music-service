import request from 'supertest';

import app from '../../app';

const baseUrl = '/musify/music-artist/details/';
const healthCheck = '/_status';
const mbid = '8e68819d-71be-4e7d-b41d-f1df81b01d3f';

describe('GET results based on MBID', () => {
    it('Given the route (GET)/musify/music-artist/details, should be able to fetch data with appropriate reqs.params.mbid', async () => {
        const response = await request(app)
            .get(baseUrl + mbid)
            .type('json');
        expect(response.status).toBe(200);
        expect(response.body.mbid).toBe(mbid);
        expect(response.body.name).toBe('50 Cent');
        expect(response.body).toHaveProperty('country', 'US');
        expect(response.body).toHaveProperty('disambiguation');
        expect(response.body).toHaveProperty('albums');
    });

    it('Given the route (GET)/_status, should be able to show that server is alive', async () => {
        const response = await request(app).get(healthCheck).type('json');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('server is alive!');
    });

    it('Given the route (GET)/musify/music-artist/details, should not be able to fetch data without the req.params.mbid', async () => {
        const response = await request(app).get(baseUrl).type('json');
        expect(response.status).toBe(404);
    });
});
