/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import request from 'supertest';

import { expect } from 'chai';
import randomWords from 'random-words';
import request from 'supertest';
import { GifResponse } from '../../model/index';
import app from '../../app';

export function letterGreaterThanThree() {
    const minThreeNum = randomWords({ min: 3, max: 10 });
    const data = minThreeNum[Math.floor(Math.random() * minThreeNum.length)];
    console.log(data);
    return data;
}

describe('POST /api/gifs', () => {
    it('Response fails if the searchString is less than 3 characters ', async () => {
        const response = await request(app).post('/api/gifs').send({
            searchString: 'ab',
        });
        expect(response.status).to.eql(400);
        expect(response.body.message[0].msg).to.eql('The search string must be a minimum of 3 characters');
    });

    it('with search string between 3 and 300 returns a valid response collection with  url,id,width and height ', async () => {
        const input = letterGreaterThanThree();

        const response = await request(app).post('/gifs/search').send({
            searchString: input,
        });

        expect(response.status).to.eql(200);
        expect(response.body).to.be.an('array');
        expect(response.body.map((d: GifResponse) => d)[0]).to.have.have.property('url');
        expect(Object.keys(response.body.map((d: GifResponse) => d)[0])).to.eql([
            'id',
            'height',
            'width',
            'size',
            'url',
        ]);
    });
});
