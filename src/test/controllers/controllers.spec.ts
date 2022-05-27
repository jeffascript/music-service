import { expect } from 'chai';
import sinon from 'sinon';

import faker from 'faker';

import randomWords from 'random-words';
import { GifResponse } from '../../model';
import SearchController from '../../controllers';
import AxioFetch from '../../utils/axios';
import jsonResult from '../../model/sampleResponse.json';

function letterGreaterThanThree() {
    const minThreeNum = randomWords({ min: 3, max: 10 });
    const data = minThreeNum[Math.floor(Math.random() * minThreeNum.length)];
    console.log(data);
    return data;
}

describe('Get result with mocked API method', () => {
    let fetchApiCallStub: sinon.SinonSpy<any, any>;
    beforeEach(() => {
        fetchApiCallStub = sinon.stub(AxioFetch, 'searchWithParams').callsFake(() => {
            return Promise.resolve(jsonResult);
        });
    });

    afterEach(() => {
        fetchApiCallStub.restore();
    });

    it('Return formatted result from API fetch', async () => {
        const searchString = letterGreaterThanThree();
        const key = faker.datatype.uuid();
        console.log(key, searchString);
        const message = await SearchController.fetchGifs({ searchString, apiKey: key });

        const stubValue = ['id', 'height', 'width', 'size', 'url'];
        sinon.assert.called(fetchApiCallStub);
        console.log(message);
        expect(Object.keys(message.map((d: GifResponse) => d)[0])).to.eql(stubValue);
    });
});
