import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AlbumSrc } from '../types/types';
import { BsPlayFill, BsPlusCircle, BsThreeDots } from 'react-icons/bs';
import TracksList from './TracksList';

export default function AlbumPage() {
  const [currentAlbum, setCurrentAlbum] = useState<AlbumSrc>();

  const params = useParams();

  const getCurrentAlbum = async () => {
    const URL = `https://deezerdevs-deezer.p.rapidapi.com/album/${params.albumId}`;

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
        setCurrentAlbum(data);
      } else {
        throw new Error('Errore recupero album corrente');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentAlbum();
  }, []);

  return (
    <div className='bg-[#121212] rounded-2xl min-h-full overflow-hidden pb-20'>
      <section className='h-[250px] relative overflow-hidden ps-5 pt-5 flex justify-start align-bottom gap-5'>
        <img
          src={currentAlbum?.cover_medium}
          alt='album poster'
          className='rounded-xl'
        />
        <div className='text-white flex flex-col justify-end'>
          <p>Album</p>
          <h1 className='text-7xl font-bold mt-2 mb-8'>
            {currentAlbum?.title}
          </h1>
          <div className='flex'>
            <img
              src={currentAlbum?.artist.picture_small}
              alt='artist picture'
              className='w-[30px] rounded-full me-2'
            />
            <p className='font-semibold text-red-500'>
              <span className='text-white'>{currentAlbum?.artist.name}</span> •{' '}
              {currentAlbum?.release_date.slice(0, 4)} •{' '}
              {currentAlbum?.nb_tracks} songs, {currentAlbum?.duration}
            </p>
          </div>
        </div>
      </section>

      <section className='px-5'>
        <div className='px-8 py-4 text-white flex items-center gap-6'>
          <button className='cursor-pointer bg-[#1ED760] rounded-full justify-center items-center w-fit aspect-1/1 p-1 hover:bg-[#3BE477]'>
            <BsPlayFill className='text-black text-4xl' />
          </button>
          <button className='cursor-pointer'>
            <BsPlusCircle className='text-2xl text-gray-500 hover:text-white ' />
          </button>
          <button className='cursor-pointer'>
            <BsThreeDots className='text-2xl text-gray-500 hover:text-white' />
          </button>
        </div>

        <div>
          {currentAlbum?.id && (
            <TracksList
              artist={currentAlbum?.artist}
              tracks={currentAlbum?.tracks.data}
            />
          )}
        </div>
      </section>
    </div>
  );
}
