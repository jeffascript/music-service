import { ArrayOfUnknownObjects } from '../model/types';
import FetchRequest from '../utils/axios';

class WikiApiService {
    public async findArtistTitle(artistRelations: ArrayOfUnknownObjects[]) {
        const resource = artistRelations.find((relation: ArrayOfUnknownObjects) => relation.type === 'wikidata');

        const urlResource = resource?.url?.resource;

        const wikiDataId = urlResource.match(/\/([a-zA-Z0-9]+)$/)[1];

        const wikiDataURL = `https://www.wikidata.org/wiki/Special:EntityData?id=${wikiDataId}&format=json`;
        const wikiResponse = await FetchRequest.withUrl(wikiDataURL);
        const artistTitle = wikiResponse.entities[wikiDataId].sitelinks.enwiki.title;

        return artistTitle;
    }

    public async findArtistDescription(artistTitle: string) {
        const wikiDataURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${artistTitle}`;

        const artistWiki = await FetchRequest.withUrl(wikiDataURL);
        const artistWikiDescription = artistWiki.extract_html;

        return artistWikiDescription;
    }
}

export default new WikiApiService();
