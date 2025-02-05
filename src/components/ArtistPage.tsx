/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router';
import { ArtistSrc, Track } from '../types/types';
import { BsPatchCheckFill, BsPlayFill, BsThreeDots } from 'react-icons/bs';
import TracksList from './TracksList';

const initialArtist: ArtistSrc = {
  id: 0,
  name: '',
  link: '',
  share: '',
  picture: '',
  picture_small: '',
  picture_medium: '',
  picture_big: '',
  picture_xl: '',
  nb_album: 0,
  nb_fan: 0,
  radio: false,
  tracklist: '',
  type: 'Artist',
};

export default function ArtistPage() {
  const [currentArtist, setCurrentArtist] = useState<ArtistSrc>(initialArtist);
  const [currentTracks, setCurrentTracks] = useState<Track[]>();

  const params = useParams<Params>();

  const getArtist = async () => {
    const URL = `https://deezerdevs-deezer.p.rapidapi.com/artist/${params.artistId}`;

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
        const data = (await response.json()) as ArtistSrc;
        setCurrentArtist(data);
        console.log(data);
        getTest(data.tracklist);
      } else {
        throw new Error('Errore nel recupero dei dati');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTest = async (URL: string) => {
    const MyURL = `https://cors-anywhere.herokuapp.com/${URL}`;
    try {
      const response = await fetch(MyURL, {
        method: 'GET',
        headers: {
          Host: 'api.deezer.com',
          Accept: '/',
          'Accept-Encoding': 'gzip, deflate, br',
          'Access-Control-Allow-Origin': '*',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('ECCOLEEE');
        console.log(data.data);
        setCurrentTracks(data.data);
      } else {
        console.log('ei');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div className='bg-[#121212] rounded-2xl min-h-full overflow-hidden'>
      <section className='h-[250px] relative overflow-hidden'>
        <img
          src={currentArtist.picture_xl}
          alt='artist poster'
          className='w-full block relative bottom-120 opacity-65'
        />
        <div className='h-full w-full absolute top-0 start-0 text-white flex flex-col justify-around ps-5 pt-10 pb-3'>
          <p className='flex'>
            <BsPatchCheckFill className='text-2xl text-[#4CB3FF] me-2' />{' '}
            Verified Artist
          </p>
          <h1 className='text-8xl font-bold'>{currentArtist.name}</h1>
          <p className='font-medium'>
            {currentArtist.nb_fan} monthly listeners
          </p>
        </div>
      </section>

      <div className='px-8 py-4 text-white flex items-center gap-6'>
        <button className='cursor-pointer bg-[#1ED760] rounded-full justify-center items-center w-fit aspect-1/1 p-1 hover:bg-[#3BE477]'>
          <BsPlayFill className='text-black text-4xl' />
        </button>
        <button className='cursor-pointer border border-gray-500 rounded-full px-3 py-0.5 pb-1 text-sm hover:border-white hover:scale-110'>
          Follow
        </button>
        <button className='cursor-pointer'>
          <BsThreeDots className='text-2xl text-gray-500 hover:text-white' />
        </button>
      </div>

      <section className='px-8 py-4 pb-20'>
        {currentTracks?.length && (
          <TracksList artist={currentArtist} tracks={currentTracks} />
        )}
      </section>
    </div>
  );
}
