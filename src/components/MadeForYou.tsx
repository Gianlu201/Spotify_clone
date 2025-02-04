import EmblaCarousel from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import '../../public/assets/css/emblaCarousel.css';
import { useEffect, useState } from 'react';
import { Track } from '../types/types';

const OPTIONS: EmblaOptionsType = { dragFree: true };

export default function MadeForYou() {
  const [madeForYouArr, setMadeForYouArr] = useState<Track[]>([]);

  const getTracks: () => void = async () => {
    const query = 'more';
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
        setMadeForYouArr(data.data);
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
    <div>
      <h2 className='text-white text-2xl font-semibold'>Made for you</h2>
      <div>
        {madeForYouArr.length > 0 && (
          <EmblaCarousel tracks={madeForYouArr} options={OPTIONS} />
        )}
      </div>
    </div>
  );
}
