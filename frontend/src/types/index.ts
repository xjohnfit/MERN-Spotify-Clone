export interface Song {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageUrl: string;
    songUrl: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
    createdAt: Date;
    updatedAt: Date;
}