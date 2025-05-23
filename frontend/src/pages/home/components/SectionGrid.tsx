import { Button } from '../../../components/ui/button';
import { Song } from '../../../types';
import PlayButton from './PlayButton';
import SectionGridSkeleton from './SectionGridSkeleton';

type SectionGridProps = {
    title: string;
    songs: Song[];
    isLoading: boolean;
};

const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
    if (isLoading) return <SectionGridSkeleton />;
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
                <Button
                    variant="link"
                    className="text-sm text-zinc-400 hover:text-white"
                >
                    See all
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {songs.map((song) => (
                    <div
                        key={song._id}
                        className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
                    >
                        <div className="relative mb-4">
                            <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                                <img
                                    src={song.imageUrl}
                                    alt={song.title}
                                    className="w-full h-full object-cover flex-shrink-0 transition-transform duration-300 
									group-hover:scale-105"
                                />
                            </div>
                            
                        </div>
                        <div className='relative'>
                            <h3 className="font-medium mb-2 truncate">
                                {song.title}
                            </h3>
                            <p className="text-sm text-zinc-400 truncate">
                                {song.artist}
                            </p>
                            <PlayButton song={song} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SectionGrid;
