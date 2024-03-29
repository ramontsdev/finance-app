import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center bg-gradient-to-r from-gray-400 to-transparent"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="w-6 text-gray-800" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-end bg-gradient-to-l from-gray-400 to-transparent"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="w-6 text-gray-800" />
      </button>
    </>
  );
}
