import moxios from 'moxios';
import sinon from 'sinon';
import faker from 'faker';
import { expect } from 'chai';

import { equal } from 'assert';
import randomWords from 'random-words';
import AxioFetch from '../../utils/axios';

import jsonResponse from '../../model/sampleResponse.json';

function letterGreaterThanThree() {
    const minThreeNum = randomWords({ min: 3, max: 10 });
    const data = minThreeNum[Math.floor(Math.random() * minThreeNum.length)];
    console.log(data);
    return data;
}

describe('FETCH', () => {
    describe('across entire suite', () => {
        beforeEach(() => {
            // import and pass your custom axios instance to this method
            moxios.install();
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall();
        });

        it('The service for FetchAPI is callable', (done) => {
            moxios.withMock(() => {
                const onFulfilled = sinon.spy();

                const searchString = letterGreaterThanThree();
                const key = faker.datatype.uuid();
                console.log(key, searchString);

                AxioFetch.searchWithParams({ searchString, apiKey: key }).then(onFulfilled);

                moxios.wait(() => {
                    const request = moxios.requests.mostRecent();
                    request
                        .respondWith({
                            status: 200,
                            response: jsonResponse,
                        })
                        .then(() => {
                            equal(onFulfilled.called, true);
                            done();
                        });
                });
            });
        });

        it('The Service for Fetch can return real data', async () => {
            const expectedResponse = jsonResponse;

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({ status: 200, response: expectedResponse });
            });
            const searchString = letterGreaterThanThree();
            const key = faker.datatype.uuid();
            console.log(key, searchString);
            const result = await AxioFetch.searchWithParams({ searchString, apiKey: key });
            console.log(result);
            expect(result).equal(expectedResponse);
        });

        it('The Service for Fetch can return reject with errors', async () => {
            const expectedResponse = jsonResponse;

            const errResp = {
                status: 422,
                response: { message: 'problem' },
            };
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith(errResp);
            });

            const searchString = letterGreaterThanThree();
            const key = faker.datatype.uuid();
            console.log(key, searchString);
            const result = await AxioFetch.searchWithParams({ searchString, apiKey: key });
            console.log(result);

            expect(result).to.not.equal(expectedResponse);
        });
    });
});
