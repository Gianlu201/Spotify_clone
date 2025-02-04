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

type PropType = {
  tracks: Track[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { tracks, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className='embla'>
      <div className='embla__viewport relative' ref={emblaRef}>
        <div className='embla__container mt-2 ps-3'>
          {tracks.map((track) => (
            <div className='embla__slide rounded-lg' key={track.id}>
              <div>
                <img
                  className='w-full rounded-lg'
                  src={track.album.cover_medium}
                  alt=''
                />
              </div>
              <p className='text-gray-400 font-medium mt-1'>
                {track.artist.name}
              </p>
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
