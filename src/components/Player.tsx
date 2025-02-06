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
    const sound = document.getElementById('audio');
    sound.volume = volumeLevel / 100;
  }, [volumeLevel]);

  return (
    <div className='h-[10vh] max-h-[70px] fixed start-0 bottom-0 z-50 w-full bg-black flex justify-between items-center px-5'>
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
          <input type='range' name='player' />
        </div>
      </div>

      <div className='flex items-center'>
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
