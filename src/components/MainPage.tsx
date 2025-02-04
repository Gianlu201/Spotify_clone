import JumpBackIn from './JumpBackIn';
import MadeForYou from './MadeForYou';
import RecentlyPlayed from './RecentlyPlayed';
import RecentPlaylist from './RecentPlaylist';

export default function MainPage() {
  return (
    <div className='bg-[#121212] rounded-2xl px-8 py-4 min-h-full pb-20'>
      <div className='text-white'>
        <button className='bg-[#2A2A2A90] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#33333390] activeBtn'>
          All
        </button>
        <button className='bg-[#2A2A2A90] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#33333390]'>
          Music
        </button>
        <button className='bg-[#2A2A2A90] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#33333390]'>
          Podcast
        </button>
      </div>

      <RecentPlaylist />

      <MadeForYou />

      <JumpBackIn />

      <RecentlyPlayed />
    </div>
  );
}
