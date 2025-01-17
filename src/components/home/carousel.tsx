import { MdOutlineNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const Carousel = () => {
   const [items,setItems] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState<any>(0);

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
    const res= await fetch("https://stile-backend.vercel.app/banner");
    const data = await res.json();
    setItems(data);
  }
 
  useEffect(()=>{
    getBanner();
  },[])
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full p-4">
      {/* Carousel Section */}
      <div className="relative flex-1 h-[300px] md:h-[600px] w-full md:w-[50%] overflow-hidden bg-gray-100 rounded-lg flex flex-col justify-between">
        {/* Carousel Wrapper */}
        <div
          className="flex transition-transform ease-in-out duration-300 h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.length>0 && items?.map((item:any) => (
            <div
              key={item._id}
              className="w-full flex-shrink-0 flex items-center justify-center"
            >
              <img
                 loading="lazy"
                src={item.image}
                alt={item.title}
                className="h-full w-full object-top object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          className="absolute text-sm h-5 flex justify-center items-center w-5 md:h-10 md:w-10 bg-black text-white top-1/2 left-2 transform -translate-y-1/2 rounded-full"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <GrFormPrevious />
        </button>

        {/* Next Button */}
        <button
          className="absolute flex justify-center items-center h-5 w-5 md:h-10 md:w-10 bg-black text-white top-1/2 right-2 transform -translate-y-1/2 rounded-full"
          onClick={goNext}
          disabled={currentIndex === items.length - 1}
        >
         <MdOutlineNavigateNext />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-12 flex justify-center w-full">
          {items.map((_:any, index:number) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Button */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <button className="hover:bg-black hover:text-white text-[12px] text-black md:text-sm py-1 px-3 md:py-3 md:font-semibold md:px-6 rounded bg-white transition duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Customize Section */}
      <div className="relative flex-1 h-[300px] md:h-[600px] w-full md:w-[50%] overflow-hidden bg-gray-100 rounded-lg flex flex-col justify-between items-center">
        <img
          src="/custom.gif"
          alt="Customize GIF"
          className="h-full w-full object-contain"
        />

        {/* Button */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <Link to='/customize'><button className="bg-green-600 font-semibold  text-white text-[12px] md:text-sm py-1 px-3 md:py-3 md:font-semibold md:px-6 rounded hover:bg-green-700 transition duration-300">
            Customize
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
