import { Album } from '../model/types';
import FetchRequest from '../utils/axios';

class CoverArtApiService {
    public removeStatusFromResolvedPromise(arr: PromiseSettledResult<unknown>[], key: string): Album[] {
        return arr.map((item: Record<string, any>) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: omitted, ...rest } = item;
            return rest.value;
        });
    }

    public async fetchAlbumImg(albums: Record<string, unknown>[]) {
        try {
            const modifiedAlbumWithImgs = await Promise.allSettled(
                albums.map(async (album: Record<string, unknown>) => {
                    const albumId = album.id;

                    const albumURL = `http://coverartarchive.org/release-group/${albumId}`;
                    const albumResponse = await FetchRequest.withUrl(albumURL);
                    const frontAlbumUrl = albumResponse.images.find(
                        (image: Record<string, unknown>) => image.front === true,
                    );

                    const albumCdImg = albumResponse.images[0].image;

                    return {
                        id: albumId,
                        title: album.title,
                        imageUrl: frontAlbumUrl ? frontAlbumUrl.image : albumCdImg,
                    };
                }),
            );
            return modifiedAlbumWithImgs;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CoverArtApiService();
