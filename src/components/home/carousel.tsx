import { MdOutlineNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [items, setItems] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const generateSlug = (name:any) =>{
    return name.trim().toLowerCase().replace(/\s+/g, '-');
}
  const goNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  async function getBanner() {
    setIsLoading(true);
    const res = await fetch("https://stile-backend.vercel.app/banner");
    const data = await res.json();
    setItems(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
 // Content has loaded
  }

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
    <div className="flex  flex-col md:flex-row gap-2 items-center justify-center  md:h-[450px] min-w-full p-2 md:p-4">
      {/* Carousel Section */}
      {isLoading &&  <div className="md:w-[50%] w-full h-[180px] sm:h-[450px] md:h-[400px]  animate-pulse bg-gray-200 border rounded-lg"></div>}
      <div className="relative  h-[180px] md:h-[450px] w-full md:w-[50%] overflow-hidden  rounded-lg flex flex-col justify-between">
        {/* Carousel Wrapper */}
        <div
          className="flex transition-transform ease-in-out duration-300 max-h-[180px] sm:h-[450px] md:h-[400px]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.length > 0 &&
            items.map((item: any) => (
              <div
                key={item._id}
                className="w-full h-[180px] md:h-[450px] flex-shrink-0 flex items-center justify-center"
              >
                {isLoading ? (
                  // Skeleton Loader
                  <div className="min-w-full min-h-[150px] sm:min-h-[450px] md:min-h-[400px]  animate-pulse bg-gray-200 border rounded-lg"></div>
                ) : (
                  <>
                 <div className="relative md:h-[400px] rounded-lg sm:h-[450px]  h-full min-w-full">
                 <div className="absolute bottom-2 flex justify-center w-full">
          {items.map((_: any, index: number) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
                  <img
                    loading="lazy"
                    srcSet={`
                      ${item.image}?format=webp,
                      ${item.image}?format=webp,
                      ${item.image}?format=webp
                    `}
                    src={`${item.image}?q=30&format=webp`}
                    alt={item.title}
                    className="object-cover object-top rounded-lg w-full h-full"
                  />
                  <div className="absolute bottom-8  left-1/2 transform -translate-x-1/2">
                  <Link to={`/subcategory/${generateSlug(item.title)}`}> <button className="hover:bg-black border hover:text-white text-[12px] text-black md:text-sm py-1 px-3 md:py-3 md:font-semibold md:px-6 rounded bg-white transition duration-300">
                     Shop Now
                   </button>
                   </Link>
                 </div>
                 </div>
                 </>
                )}
              </div>
            ))}
        </div>

        {/* Previous Button */}
        
        <button
          className={`${currentIndex=== 0?"hidden":"absolute"}  text-sm min-h-5 flex justify-center items-center w-5 md:min-h-10 md:w-10 bg-black text-white top-1/2 left-2 transform -translate-y-1/2 rounded-full`}
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <GrFormPrevious />
        </button>

        {/* Next Button */}
        <button
          className={`absolute ${currentIndex === items.length - 1?"hidden":"absolute "} flex justify-center items-center min-h-5 min-w-5 md:min-h-10 md:min-w-10 bg-black text-white top-1/2 right-2 transform -translate-y-1/2 rounded-full`}
          onClick={goNext}
          disabled={currentIndex === items.length - 1}
        >
          <MdOutlineNavigateNext />
        </button>

        {/* Dots Indicator */}

      </div>
    
      {/* Customize Section */}
      {/* {isLoading ?<div className="min-h-[230px] sm:min-h-[450px] w-full md:min-w-[50%] md:min-h-[400px]"></div>} */}
      <div className="relative flex-1 h-[180px]  md:h-[400px] w-full md:w-[50%] rounded-lg overflow-hidden bg-[#b5fc6b]  flex flex-col justify-between items-center">
        <img
          src="/customize.png"
          alt="Customize GIF"
          className="md:h-[450px] rounded-lg sm:h-[300px] h-[180px] min-w-full object-contain"
        />

        {/* Button */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <Link to="/customize">
            <button className="bg-green-600 font-semibold text-white text-[12px] md:text-sm py-1 px-3 md:py-3 md:font-semibold md:px-6 rounded hover:bg-green-700 transition duration-300">
              Customize
            </button>
          </Link>
        </div>
      </div>
    </div>
    {/* <div className="w-full ">
                  <img className="object-contain w-full h-full" src="/story.webp" alt="" />
                </div> */}
    </>
  );
};

export default Carousel;
