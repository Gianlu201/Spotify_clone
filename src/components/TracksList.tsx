import { BsPlayFill, BsPlusCircle, BsThreeDots } from 'react-icons/bs';
import { Artist, Track } from '../types/types';
import '../../public/assets/css/tracksList.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setCurrentSongAction } from '../redux/actions';
import { useParams } from 'react-router';

interface TracksListProps {
  artist: Artist;
  tracks: Track[];
}

export default function TracksList(props: TracksListProps) {
  const [showMore, setShowMore] = useState(false);

  const dispatch = useAppDispatch();

  const params = useParams();

  const currentSong = useAppSelector((store) => store.currentSong) as Track;

  const getShowNumb = (): number => {
    if (params.albumId) {
      return props.tracks.length;
    }
    if (showMore) {
      return 10;
    } else return 5;
  };

  return (
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
                <button
                  className='hoverShow'
                  onClick={() => dispatch(setCurrentSongAction(track))}
                >
                  <BsPlayFill
                    className={'cursor-pointer text-2xl '.concat(
                      currentSong.id === track.id
                        ? 'text-[#1ED760]'
                        : 'text-white'
                    )}
                  />
                </button>
              </div>
              <div className='col-span-2'>
                <img
                  src={track.album.cover_small}
                  alt='album picture'
                  className='w-[40px] aspect-1/1 mx-auto cursor-pointer'
                />
              </div>
              <div
                className={'col-span-11 flex items-center ps-3 '.concat(
                  currentSong.id === track.id ? 'text-[#1ED760]' : ''
                )}
              >
                <span
                  className='cursor-pointer'
                  onClick={() => dispatch(setCurrentSongAction(track))}
                >
                  {track.title_short}
                </span>
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
      {props.tracks.length > 5 && !params?.albumId && (
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
      )}
    </div>
  );
}
