import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMusicStore } from '../../stores/useMusicStore';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Button } from '../../components/ui/button';
import { Clock, Play, ChartNoAxesColumn, Pause  } from 'lucide-react';
import { usePlayerStore } from '../../stores/usePlayerStore';

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AlbumPage = () => {
    const { albumId } = useParams();
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

    useEffect(() => {
        fetchAlbumById(albumId!); //exclamation mark is used to assert that albumId is not null or undefined
    }, [fetchAlbumById, albumId]);

    if (isLoading) return null;

    const handlePlaySong = (index: number) => {
        if (!currentAlbum) return;
        playAlbum(currentAlbum?.songs, index);
    };

    const handlePlayAlbum = () => {
        if (!currentAlbum) return;

		const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
		if (isCurrentAlbumPlaying) togglePlay();
		else {
			// start playing the album from the beginning
			playAlbum(currentAlbum?.songs, 0);
		}
    };

    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                {/* Main Content */}
                <div className="relative min-h-full">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
                        aria-hidden="true"
                    />

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex p-6 gap-6 pb-8">
                            <img
                                src={currentAlbum?.imageUrl}
                                alt={currentAlbum?.title}
                                className="w-[240px] h-[240px] rounded shadow-lg"
                            />
                            <div className="flex flex-col justify-end">
                                <p className="text-sm font-medium">Album</p>
                                <h1 className="text-7xl font-bold my-4">
                                    {currentAlbum?.title}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-zinc-100">
                                    <span className="font-medium text-white">
                                        {currentAlbum?.artist}
                                    </span>
                                    <span>
                                        • {currentAlbum?.songs.length} songs
                                    </span>
                                    <span>• {currentAlbum?.releaseYear}</span>
                                </div>
                            </div>
                        </div>

                        {/* Play Button */}
                        <div className="px-6 pb-4 flex items-center gap-6">
                            <Button
                                onClick={handlePlayAlbum}
                                size="icon"
                                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
                            >
                                {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
									<Pause className='' />
								) : (
									<Play className='' />
								)}
                            </Button>
                        </div>

                        {/* Table */}
                        <div className="bg-black/20 backdrop-blur-sm">
                            {/* table header */}
                            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                                <div>#</div>
                                <div>Title</div>
                                <div>Released Date</div>
                                <div>
                                    <Clock className="h-4 w-4" />
                                </div>
                            </div>

                            {/* Songs list */}
                            <div className="px-6">
                                <div className="space-y-2 px-4">
                                    {currentAlbum?.songs.map((song, index) => {

                                        const isCurrentSong = currentSong?._id === song._id;

                                        return (
                                            <div
                                                onClick={() => handlePlaySong(index)}
                                                key={song._id}
                                                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                                            >
                                                <div className="flex items-center justify-center">
                                                    {
                                                        isCurrentSong && isPlaying ? (
                                                            <div className='size-4 text-green-500'><ChartNoAxesColumn /></div>
                                                        ) : (
                                                            <span className='group-hover:hidden'>{index + 1}</span>
                                                        )
                                                    }
                                                    {!isCurrentSong && (
														<Play className='h-4 w-4 hidden group-hover:block' />
													)}
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <img
                                                        className="size-10"
                                                        src={song.imageUrl}
                                                        alt={song.title}
                                                    />
                                                    <div>
                                                        <div
                                                            className={`font-medium text-white`}
                                                        >
                                                            {song.title}
                                                        </div>
                                                        <div>{song.artist}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    {
                                                        song.createdAt.split(
                                                            'T'
                                                        )[0]
                                                    }
                                                </div>
                                                <div className="flex items-center">
                                                    {formatDuration(
                                                        song.duration
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
export default AlbumPage;
