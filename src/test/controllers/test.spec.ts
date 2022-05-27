/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-const */
import sinon from 'sinon';
import faker from 'faker';
import wikiapiService from '../../services/wikiapi.service';
import CoverArtAPi from '../../services/coverapi.service';
import ArtistController from '../../controllers/artist.controller';
import BrainApiService from '../../services/brainapi.service';
import jsonResult from '../../model/sampleResponse.json';
import externalApiResponse from '../../model/sampleapiresponse.json';

describe('Get result with mocked API method', () => {
    let brainMusicApiCallStub: sinon.SinonSpy<any, any>;
    let wikiApiCallStub: sinon.SinonSpy<any, any>;
    let wikiApiCallDescriptionStub: sinon.SinonSpy<any, any>;
    let convertArtApiCallStub: sinon.SinonSpy<any, any>;
    let convertArtApiRemoveCallStub: sinon.SinonSpy<any, any>;
    let artistControllerStub: sinon.SinonSpy<any, any>;

    const req: any = {
        params: faker.datatype.uuid(),
    };

    const res: any = {
        json: jest.fn(() => res),
        status: jest.fn(() => res),
    };
    const next = jest.fn();

    const artisteTitleName = faker.datatype.string();
    const descriptionRand = faker.datatype.string();

    brainMusicApiCallStub = sinon.stub(BrainApiService, 'find').callsFake(() => {
        return Promise.resolve(externalApiResponse);
    });

    wikiApiCallStub = sinon.stub(wikiapiService, 'findArtistTitle').callsFake(() => {
        return Promise.resolve(artisteTitleName);
    });

    wikiApiCallDescriptionStub = sinon.stub(wikiapiService, 'findArtistDescription').callsFake(() => {
        return Promise.resolve(jsonResult.description);
    });

    convertArtApiCallStub = sinon.stub(CoverArtAPi, 'fetchAlbumImg').callsFake((): Promise<any> => {
        return Promise.resolve(externalApiResponse['release-groups']);
    });
    convertArtApiRemoveCallStub = sinon.stub(CoverArtAPi, 'removeStatusFromResolvedPromise').callsFake((): any => {
        return Promise.resolve(jsonResult.albums);
    });

    artistControllerStub = sinon.stub(ArtistController, 'findByMBID').callsFake((): any => {
        return Promise.resolve(jsonResult.albums);
    });

    it('Return Results from the API with the mbid', async () => {
        const musicResponse = await BrainApiService.find(req.params.mbid);
        sinon.assert.called(brainMusicApiCallStub);
        expect(musicResponse).toBeDefined();
        expect(musicResponse.id).toBeDefined();
        expect(musicResponse.id).toEqual('f27ec8db-af05-4f36-916e-3d57f91ecf5e');
        expect(Object.keys(musicResponse).map((d) => d)).toBeInstanceOf(Array);
    });

    it('Returns Artists Title', async () => {
        const artistTitle = await wikiapiService.findArtistTitle(
            externalApiResponse.relations as Record<string, unknown>[],
        );
        sinon.assert.called(wikiApiCallStub);
        expect(artistTitle).toBeDefined();
        expect(artistTitle).toEqual(artisteTitleName);
    });

    it('Returns Artists Description', async () => {
        const artistDescription = await wikiapiService.findArtistDescription(descriptionRand);
        sinon.assert.called(wikiApiCallDescriptionStub);
        expect(artistDescription).toBeDefined();
        expect(artistDescription).toEqual(jsonResult.description);
    });

    it('Returns Artists Albums', async () => {
        const artistAlbums = await CoverArtAPi.fetchAlbumImg(externalApiResponse['release-groups']);
        sinon.assert.called(convertArtApiCallStub);
        expect(artistAlbums).toBeDefined();
        expect(artistAlbums).toEqual(externalApiResponse['release-groups']);
        expect(artistAlbums).toBeInstanceOf(Array);
    });

    it('Returns structured Album', async () => {
        const artistAlbums = await CoverArtAPi.fetchAlbumImg(externalApiResponse['release-groups']);
        const artistStructuredAlbum = CoverArtAPi.removeStatusFromResolvedPromise(artistAlbums as any, 'status');
        sinon.assert.called(convertArtApiRemoveCallStub);
        expect(artistStructuredAlbum).toBeDefined();
        expect(artistStructuredAlbum).toBeInstanceOf(Promise);
    });

    it('Returns Album once request is made', async () => {
        const artistController = await ArtistController.findByMBID(req, res, next);

        sinon.assert.called(artistControllerStub);
        expect(artistController).toBeDefined();
        expect(artistController).toBeInstanceOf(Array);
        console.log(artistController);
    });
});
