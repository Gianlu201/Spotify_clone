import { useEffect, useState } from 'react';
import { Track } from '../types/types';
import { BsPlayFill } from 'react-icons/bs';
import { useAppDispatch } from '../redux/app/hooks';
import { setCurrentSongAction } from '../redux/actions';

export default function RecentPlaylist() {
  const [recents, setRecents] = useState<Track[]>([]);

  const dispatch = useAppDispatch();

  const getPlaylist = async () => {
    const query = 'everything';
    const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;

    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'd199ac2f7cmshc83995374704875p160fb9jsnc22720509b31',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecents(data.data);
      } else {
        throw new Error('Errore nel recupero dei dati');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const playTrack = (track: Track) => {
    dispatch(setCurrentSongAction(track));
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div>
      {recents.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-6'>
          {recents.slice(0, 8).map((track) => {
            return (
              <div
                key={track.id}
                className='flex items-center mb-4 bg-[#2A2A2A90] me-6 rounded-lg pe-3 cursor-pointer hover:bg-[#33333390] relative reproductionArea'
              >
                <div className='min-w-fit me-3'>
                  <img
                    src={track.album.cover_small}
                    alt='album cover'
                    className=' min-w-fit'
                  />
                </div>
                <h4 className='text-white font-medium capitalize py-1.5 pe-7 textLineClamp'>
                  {track.album.title}
                </h4>
                <button
                  className='bg-[#1ED760] hover:bg-[#3BE477] rounded-full w-fit aspect-1/1 p-1.5 absolute top-[50%] end-2 translate-y-[-50%] cursor-pointer hidden btnReproduce'
                  onClick={() => {
                    playTrack(track);
                  }}
                >
                  <BsPlayFill className=' text-black size-6' />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
