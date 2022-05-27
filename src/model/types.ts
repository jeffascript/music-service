export interface Album {
    id: string;
    title: string;
    imageUrl: string;
}

export interface ArtistFullInformation {
    mbid: string;
    name: string;
    gender: string;
    country: string;
    disambiguation: string;
    description: string;
    albums: Album[];
}

export type ArrayOfUnknownObjects = {
    [key: string]: any;
};
