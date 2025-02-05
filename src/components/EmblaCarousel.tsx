import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
// import {
//   PrevButton,
//   NextButton,
//   usePrevNextButtons,
// } from 'EmblaCarouselArrowButtons';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { Track } from '../types/types';
import { BsPlayFill } from 'react-icons/bs';
import { setCurrentSongAction } from '../redux/actions';
import { useAppDispatch } from '../redux/app/hooks';
import { Link } from 'react-router';

type PropType = {
  tracks: Track[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const dispatch = useAppDispatch();

  const { tracks, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const playTrack = (track: Track) => {
    dispatch(setCurrentSongAction(track));
  };

  return (
    <section className='embla'>
      <div className='embla__viewport relative' ref={emblaRef}>
        <div className='embla__container mt-2 ps-3'>
          {tracks.map((track) => (
            <div className='embla__slide rounded-lg' key={track.id}>
              <div className=' relative'>
                <Link to={`/album/${track.album.id}`}>
                  <img
                    className='w-full rounded-lg'
                    src={track.album.cover_medium}
                    alt=''
                  />
                </Link>

                <button
                  className='btnPlayMusic cursor-pointer bg-[#1ED760] rounded-full justify-center items-center w-fit aspect-1/1 p-1 hover:bg-[#3BE477] absolute bottom-2 end-2 hidden'
                  onClick={() => playTrack(track)}
                >
                  <BsPlayFill className='text-black text-3xl' />
                </button>
              </div>
              <Link
                to={`/artist/${track.artist.id}`}
                className='text-gray-400 font-medium mt-1'
              >
                {track.artist.name}
              </Link>
            </div>
          ))}
        </div>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

export default EmblaCarousel;
