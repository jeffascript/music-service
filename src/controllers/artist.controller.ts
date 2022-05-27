import { NextFunction, Request, Response } from 'express';
import { cacheExpiration, redisClient } from '../utils/redis';
import HttpException from '../exceptions/HttpExceptions';
import WikiApiService from '../services/wikiapi.service';
import BrainApiService from '../services/brainapi.service';
import CoverArtApiService from '../services/coverapi.service';

class ArtistController {
    public async findByMBID(req: Request, res: Response, next: NextFunction) {
        try {
            const musicBrainsResponse = await BrainApiService.find(req.params.mbid as string);
            const { relations, id: mbid, name, gender, country, disambiguation } = musicBrainsResponse;
            const artistTitle = await WikiApiService.findArtistTitle(relations as Record<string, unknown>[]);

            const artistDescription = await WikiApiService.findArtistDescription(artistTitle as string);

            const albums = musicBrainsResponse['release-groups'];

            const resolvedAlbumWithImg = await CoverArtApiService.fetchAlbumImg(albums);
            const albumsWithImg = CoverArtApiService.removeStatusFromResolvedPromise(
                resolvedAlbumWithImg as PromiseSettledResult<unknown>[],
                'status',
            );

            const formattedMusicResult = {
                mbid,
                name,
                gender,
                country,
                disambiguation,
                description: artistDescription,
                albums: albumsWithImg,
            };

            if (!musicBrainsResponse.id) {
                throw new HttpException(404, 'Artist not found');
            }

            const cacheKey = JSON.stringify(req.params.mbid);
            redisClient.set(cacheKey, JSON.stringify(formattedMusicResult), 'EX', cacheExpiration);

            return res.status(200).json(formattedMusicResult);
        } catch (error: any) {
            next(new HttpException(error.status, error.data));
        }
    }
}

export default new ArtistController();
