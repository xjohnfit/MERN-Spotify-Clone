import Song from "../models/songModel.js";

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 }); //-1 for descending order => newest first
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    try {

        //Get 6 random songs from the database using aggregation pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 6}},
            {$project: {_id: 1, title: 1, artist: 1, imageUrl: 1, songUrl: 1}}
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};

export const madeForYou = async (req, res, next) => {
    try {
        //Get 4 random songs from the database using aggregation pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {$project: {_id: 1, title: 1, artist: 1, imageUrl: 1, songUrl: 1}}
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};

export const trending = async (req, res, next) => {
    try {
        //Get 4 random songs from the database using aggregation pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {$project: {_id: 1, title: 1, artist: 1, imageUrl: 1, songUrl: 1}}
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};