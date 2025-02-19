import Song from "../models/songModel.js";
import Album from "../models/albumModel.js";
import cloudinary from "../cloudinary.js";

//Cloudinary upload function
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Cloudinary upload error:", error);
        throw new Error("Cloudinary upload failed");
    }
};

//Create song controller
export const createSong = async (req, res, next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({message: "Please upload all required files"});
        }

        const { title, artist, albumId, duration} = req.body;
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        //Upload audio file to cloudinary
        const audioUrl = await uploadToCloudinary(audioFile);
        //Upload image file to cloudinary
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
        });

        await song.save();

        //if song belongs to an album, update the album's songs array
        if(albumId) {
            const album = await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            });
        }
        return res.status(201).json({message: "Song created successfully", song});
    } catch (error) {
        next(error);
    }
}

//Delete song controller
export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        //if songs belongs to an album, update the album's songs array
        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: id },
            });
        }

        await Song.findByIdAndDelete(id);
        res.status(200).json({message: "Song deleted successfully"});
    } catch (error) {
        console.log('Error in song delete song controller:', error);
        next(error);
    }
};

//Create album controller
export const createAlbum = async (req, res, next) => {
    try {
        const {title, artist, releaseYear} = req.body;
        const {imageFile} = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        await album.save();
        res.status(201).json({message: "Album created successfully", album});
    } catch (error) {
        console.log('Error in create album controller:', error);
        next(error);
    }
};

//Delete album controller
export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: "Album deleted successfully"});
    } catch (error) {
        console.log('Error in delete album controller:', error);
        next(error);
    }
};

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({admin: true});
}