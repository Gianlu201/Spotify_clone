import {
  BsPauseFill,
  BsPlayFill,
  BsRepeat,
  BsShuffle,
  BsSkipEndFill,
  BsSkipStartFill,
  BsVolumeDownFill,
  BsVolumeMuteFill,
  BsVolumeOffFill,
  BsVolumeUpFill,
} from 'react-icons/bs';
import { useAppSelector } from '../redux/app/hooks';
import { useEffect, useState } from 'react';
import { Track } from '../types/types';
import { calculateTimeFromSeconds } from '../utility/utilityFunction';

export default function Player() {
  const [reproductionState, setReproductionState] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(30);
  const [volumeMute, setVolumeMute] = useState(false);
  const [lastVolumeValue, setLastVolumeValue] = useState<number>(30);

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

  useEffect(() => {
    const sound = document.getElementById('audio') as HTMLAudioElement;
    sound.volume = volumeLevel / 100;
  }, [volumeLevel]);

  return (
    <div className='h-[10vh] max-h-[70px] fixed start-0 bottom-0 z-50 w-full bg-black flex justify-between items-center px-5'>
      <div className='flex text-white w-[300px] border border-red-700'>
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

      <div className='w-[500px] border border-red-700'>
        <div className='flex justify-center items-center gap-3'>
          <button className='cursor-pointer'>
            <BsShuffle className='text-xl text-white' />
          </button>
          <button className='cursor-pointer'>
            <BsSkipStartFill className='text-2xl text-white' />
          </button>
          <button className='cursor-pointer' onClick={() => handlePlayPause()}>
            {reproductionState ? (
              <BsPauseFill className='text-2xl text-white' />
            ) : (
              <BsPlayFill className='text-2xl text-white' />
            )}
          </button>
          <button className='cursor-pointer'>
            <BsSkipEndFill className='text-2xl text-white' />
          </button>
          <button className='cursor-pointer'>
            <BsRepeat className='text-xl text-white' />
          </button>
        </div>

        <div className='mt-1'>
          <audio src={currentSong.preview} id='audio' autoPlay />
          <div className='flex gap-3 text-white'>
            <span>00:00</span>
            <input type='range' name='player' className='w-full' />

            <span>{calculateTimeFromSeconds(currentSong.duration)}</span>
          </div>
        </div>
      </div>

      <div className='flex items-center border border-red-700'>
        <button
          className='cursor-pointer'
          onClick={() => {
            if (volumeMute) {
              setVolumeLevel(lastVolumeValue);
              setVolumeMute(false);
            } else {
              setLastVolumeValue(volumeLevel);
              setVolumeMute(true);
              setVolumeLevel(0);
            }
          }}
        >
          {volumeMute ? (
            <BsVolumeMuteFill className='text-white text-2xl' />
          ) : (
            <>
              <BsVolumeOffFill
                className={'text-white text-2xl '.concat(
                  volumeLevel === 0 ? '' : 'hidden'
                )}
              />
              <BsVolumeDownFill
                className={'text-white text-2xl '.concat(
                  volumeLevel > 0 && volumeLevel <= 50 ? '' : 'hidden'
                )}
              />
              <BsVolumeUpFill
                className={'text-white text-2xl '.concat(
                  volumeLevel > 50 ? '' : 'hidden'
                )}
              />
            </>
          )}
        </button>
        <input
          type='range'
          name='volume'
          value={volumeLevel}
          onChange={(e) => {
            setVolumeLevel(parseInt(e.target.value));
          }}
          min={0}
          max={100}
          disabled={volumeMute ? true : false}
          className={''.concat(
            volumeMute ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        />
      </div>
    </div>
  );
}
