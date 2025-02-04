import EmblaCarousel from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import '../../public/assets/css/emblaCarousel.css';
import { useEffect, useState } from 'react';
import { Track } from '../types/types';

const OPTIONS: EmblaOptionsType = { dragFree: true };

export default function RecentlyPlayed() {
  const [recentlyPlayedArr, setRecentlyPlayedArr] = useState<Track[]>([]);

  const getTracks: () => void = async () => {
    const query = 'sky';
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
        setRecentlyPlayedArr(data.data);
      } else {
        throw new Error('Errore nel recupero dei dati');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div className='mt-5'>
      <h2 className='text-white text-2xl font-semibold'>Recently played</h2>
      <div>
        {recentlyPlayedArr.length > 0 && (
          <EmblaCarousel tracks={recentlyPlayedArr} options={OPTIONS} />
        )}
      </div>
    </div>
  );
}
