import FetchRequest from '../utils/axios';

class BrainApiService {
    public async find(mbid: string) {
        const url = `http://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=url-rels+release-groups`;

        const fetchedData = FetchRequest.withUrl(url);

        return fetchedData;
    }
}

export default new BrainApiService();
