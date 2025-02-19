import { useEffect } from 'react';
import Topbar from '../../components/Topbar';
import { useMusicStore } from '../../stores/useMusicStore';
import FeaturedSection from './components/FeaturedSection';
import { ScrollArea } from '../../components/ui/scroll-area';
import SectionGrid from './components/SectionGrid';

const HomePage = () => {
    const {
        fetchFeaturedSongs,
        fetchMadeForYou,
        fetchTrendingSongs,
        isLoading,
        madeForYou,
        featuredSongs,
        trendingSongs,
    } = useMusicStore();

    useEffect(() => {
        fetchMadeForYou();
        fetchTrendingSongs();
        fetchFeaturedSongs();
    }, [fetchFeaturedSongs, fetchMadeForYou, fetchTrendingSongs]);

    console.log({ madeForYou, trendingSongs, featuredSongs });

    return (
        <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
            <Topbar />
            <ScrollArea className='h-[calc(100vh-180px)]'>
              <div className='p-4 sm:p-6'>
                <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good Afternoon</h1>
                <FeaturedSection />
              

              <div className='space-y-8'>
                <SectionGrid title='Made For You' songs={madeForYou} isLoading={isLoading} />
                <SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
              </div>
              </div>
            </ScrollArea>
        </main>
    );
};
export default HomePage;
