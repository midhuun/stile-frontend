import { MdOutlineNavigateNext } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import axios from 'axios';
import { apiUrl } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const generateSlug = (name: string) => {
    return name.trim().toLowerCase().replace(/\s+/g, '-');
  };
  
  const fetchBanners = async () => {
    try {
      const { data } = await axios.get(apiUrl('/banner'), {
        timeout: 5000, // 5 second timeout
        headers: {
          'Cache-Control': 'max-age=300', // 5 minutes cache
        }
      });
      return data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  };
  
  const { data: banner = [], isLoading: bannerLoading, error } = useQuery({
    queryKey: ['banner'],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 60 * 72, // 72 hours
    gcTime: 1000 * 60 * 60 * 72, // 72 hours
    retry: 1,
  });
  const goNext = () => {
    if (banner && currentIndex < banner.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  
  useEffect(() => {
    let autoswipe = setInterval(() => {
      if (banner && banner.length > 0) {
        setCurrentIndex((prev) => {
          if (prev >= banner.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, 2500);
    return () => {
      clearInterval(autoswipe);
    };
  }, [banner]);

  // Show loading state
  if (bannerLoading) {
    return (
      <div className="w-full h-[180px] md:h-[450px] flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show error state
  if (error || !banner || banner.length === 0) {
    return (
      <div className="w-full h-[180px] md:h-[450px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Unable to load banners</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-center md:h-[450px] min-w-full p-2 md:p-4">
      {/* Carousel Section */}
      {bannerLoading ? (
        <div className="md:w-[50%] w-full h-[180px] sm:h-[450px] md:h-[400px] animate-pulse bg-gray-200 border rounded-lg"></div>
      ) : (
        <div
          {...swipeHandlers} // Apply swipe here
          className="relative h-[180px] md:h-[450px] w-full md:w-[50%] overflow-hidden rounded-lg flex flex-col justify-between"
        >
          {/* Carousel Wrapper */}
          <div
            className="flex transition-all ease-in-out duration-500 max-h-[180px] sm:h-[450px] md:h-[400px]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banner &&
              banner.length > 0 &&
              banner.map((item: any) => (
                <div
                  key={item._id}
                  className="w-full h-[180px] md:h-[450px] flex-shrink-0 flex items-center justify-center"
                >
                  <div className="relative md:h-[400px] rounded-lg sm:h-[450px] h-full min-w-full">
                    <picture>
                      <source srcSet={`${item.image}?q=50&format=avif`} type="image/avif" />
                      <source srcSet={`${item.image}?q=50&format=webp`} type="image/webp" />
                      <img
                        src={`${item.image}?q=50&format=jpeg`}
                        alt={item.title}
                        className="object-cover object-top rounded-lg w-full md:h-[400px] sm:h-[450px]"
                        width={800}
                        height={400}
                        loading={currentIndex === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </picture>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                      <Link to={`/subcategory/${generateSlug(item.title)}`}>
                        <button
                          name="shop"
                          className="hover:bg-black border hover:text-white text-[12px] text-black md:text-sm py-1 px-3 md:py-3 md:font-semibold md:px-6 rounded bg-white transition duration-300"
                        >
                          Shop Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              name="previous"
              className="absolute text-sm min-h-5 flex justify-center items-center w-5 md:min-h-10 md:w-10 bg-black text-white top-1/2 left-2 transform -translate-y-1/2 rounded-full"
              onClick={goPrev}
            >
              <GrFormPrevious />
            </button>
          )}

          {/* Next Button */}
          {banner && currentIndex < banner.length - 1 && (
            <button
              name="next"
              className="absolute flex justify-center items-center min-h-5 min-w-5 md:min-h-10 md:min-w-10 bg-black text-white top-1/2 right-2 transform -translate-y-1/2 rounded-full"
              onClick={goNext}
            >
              <MdOutlineNavigateNext />
            </button>
          )}

          {/* Dots Indicator */}
          <div className="absolute bottom-2 flex justify-center w-full">
            {banner &&
              banner.map((__: any, index: any) => (
                <button
                  name="next"
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
          </div>
        </div>
      )}
      {/* Customize Section */}
      <div className="relative flex-1 h-[180px] md:h-[400px] w-full md:w-[50%] rounded-lg overflow-hidden bg-[#b5fc6b] flex flex-col justify-between items-center">
        <img
          src="https://dplytapuv1.ufs.sh/f/CEIFtxh9zBV8wlcYW0JCBR5lhQ7y6zqjDxKIXpAJkLf2Mvib"
          alt="Customize GIF"
          className="md:h-[450px] rounded-lg sm:h-[300px] h-[180px] min-w-full object-contain"
        />

        {/* Button */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <Link to="/customize">
            <button
              name="customize"
              className="bg-green-600 font-semibold text-white text-[12px] md:text-sm py-1 px-3 md:py-3 md:font-semibold md:px-6 rounded hover:bg-green-700 transition duration-300"
            >
              Customize
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
