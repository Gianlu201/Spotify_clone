import {
  BsPauseFill,
  BsPlayFill,
  BsRepeat,
  BsShuffle,
  BsSkipEndFill,
  BsSkipStartFill,
} from 'react-icons/bs';
import { useAppSelector } from '../redux/app/hooks';
import { useEffect, useState } from 'react';
import { Track } from '../types/types';

export default function Player() {
  const [reproductionState, setReproductionState] = useState(false);

  const currentSong = useAppSelector((store) => store.currentSong) as Track;

  const handlePlayPause = () => {
    const audio = document.getElementById('audio') as HTMLVideoElement;
    if (reproductionState) {
      audio!.pause();
      setReproductionState(false);
    } else {
      audio!.play();
      setReproductionState(true);
    }
  };

  useEffect(() => {
    console.log(currentSong);
    if (currentSong.id) {
      setReproductionState(true);
    }
  }, [currentSong]);

  return (
    <div className='h-[10vh] max-h-[70px] fixed start-0 bottom-0 w-full bg-black flex justify-between items-center'>
      <div className='flex text-white'>
        {currentSong.id !== 0 && (
          <>
            <img src={currentSong.album.cover_small} alt='album picture' />
            <div className='flex ms-3'>
              <div>
                <h5 className=' capitalize'>{currentSong.title}</h5>
                <span>{currentSong.artist.name}</span>
              </div>
              <button>+</button>
            </div>
          </>
        )}
      </div>

      <div>
        <div>
          <button>
            <BsShuffle className='text-white' />
          </button>
          <button>
            <BsSkipStartFill className='text-white' />
          </button>
          <button onClick={() => handlePlayPause()}>
            {reproductionState ? (
              <BsPauseFill className='text-white' />
            ) : (
              <BsPlayFill className='text-white' />
            )}
          </button>
          <button>
            <BsSkipEndFill className='text-white' />
          </button>
          <button>
            <BsRepeat className='text-white' />
          </button>
        </div>
        <div>
          <audio src={currentSong.preview} id='audio' autoPlay />
        </div>
      </div>

      <div>
        <button></button>
        <input type='range' name='volume' min={0} max={100} />
      </div>
    </div>
  );
}
