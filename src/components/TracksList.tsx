import { BsPlayFill, BsPlusCircle, BsThreeDots } from 'react-icons/bs';
import { ArtistSrc, Track } from '../types/types';
import '../../public/assets/css/tracksList.css';
import { useState } from 'react';

interface TracksListProps {
  artist: ArtistSrc;
  tracks: Track[];
}

export default function TracksList(props: TracksListProps) {
  const [showMore, setShowMore] = useState(false);

  const getShowNumb = (): number => {
    if (showMore) {
      return 10;
    } else return 5;
  };

  return (
    <div className='grid grid-cols-24'>
      <div className='col-span-14 text-white'>
        <h2 className='text-2xl font-bold mb-4'>Popular</h2>
        <div>
          {props.tracks.slice(0, getShowNumb()).map((track, i) => {
            return (
              <div
                className='trackRow grid grid-cols-24 py-2 hover:bg-[#2A2A2A]'
                key={track.id}
              >
                <div className='col-span-2 flex justify-center items-center'>
                  <span className='hoverHidden'>{i + 1}</span>
                  <button className='hoverShow'>
                    <BsPlayFill className='cursor-pointer text-2xl text-white' />
                  </button>
                </div>
                <div className='col-span-2'>
                  <img
                    src={track.album.cover_small}
                    alt='album picture'
                    className='w-[40px] aspect-1/1 mx-auto cursor-pointer'
                  />
                </div>
                <div className='col-span-11 flex items-center ps-3'>
                  <span className='cursor-pointer'>{track.title_short}</span>
                </div>
                <div className='col-span-4 flex items-center'>
                  <span>{track.rank}</span>
                </div>
                <div className='col-span-2 flex items-center'>
                  <button>
                    <BsPlusCircle className='hoverShow cursor-pointer text-gray-500 hover:text-white' />
                  </button>
                </div>
                <div className='col-span-2 flex items-center'>
                  <span>{track.duration}</span>
                </div>
                <div className='col-span-1 flex items-center'>
                  <BsThreeDots className='hoverShow cursor-pointer text-gray-500 hover:text-white' />
                </div>
              </div>
            );
          })}
        </div>
        <button
          className='ms-6 mt-3 cursor-pointer text-gray-500 font-bold hover:text-white'
          onClick={() => {
            if (showMore) {
              setShowMore(false);
            } else {
              setShowMore(true);
            }
          }}
        >
          {showMore ? 'Show less' : 'Show more'}
        </button>
      </div>
      <div className='col-span-10 text-white ps-3'>
        <h2 className='text-2xl font-bold mb-4'>Artist pick</h2>
        <div className='w-[75%] aspect-16/9 overflow-hidden rounded-lg relative'>
          <img
            src={props.artist.picture_big}
            alt='artist poster'
            className='w-full aspect-16/9 opacity-80'
            style={{
              WebkitFilter: 'blur(1px)',
            }}
          />
          <div className='absolute top-0 start-0 h-full ps-3 py-3 flex flex-col justify-between'>
            <div className='flex items-center bg-white w-fit ps-0.5 pe-2 py-0.5 rounded-full'>
              <img
                src={props.artist.picture_small}
                alt='artist picture'
                className='rounded-full aspect-1/1 w-[20px] me-2'
              />
              <span className='text-black font-medium text-sm'>
                All the hits on one playlist!
              </span>
            </div>
            <div className='text-white flex items-center'>
              <img
                src={props.artist.picture}
                alt='artist picture'
                className='rounded-md max-w-[70px]'
              />
              <div className='ms-2'>
                <p className='font-bold brightness-200'>
                  {props.artist.name} Best Of - The Hits
                </p>
                <span className='text-sm font-bold text-gray-500 brightness-150'>
                  Playlist
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
