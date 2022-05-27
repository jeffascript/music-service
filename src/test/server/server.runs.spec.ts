import request from 'supertest';

import app from '../../app';

describe('server checks', () => {
    it('server instantiated without error', (done) => {
        request(app).get('/_status').expect(200, done);
    });
});
