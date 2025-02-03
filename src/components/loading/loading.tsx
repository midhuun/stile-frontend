import './loading.css'; // Import the CSS file for styling

const Loading = () => {
  
  const loadingWords = ["S T I L E  S A G I O"];
  return (
    <div className="fixed min-h-screen w-full top-0 z-[1000] bg-white flex flex-col justify-center items-center">
    <div className='flex  flex-col items-center gap-3'>
      <img className='h-20 skeleton-img bg-[#f1f1f1] animate-spin w-20 object-contain rounded-full border ' src="/logo.png" alt="" />
    </div>
<div className="pt-10 text-lg text-gray-700 flex">
      {loadingWords.map((word:any, index:any) => (
        <span key={index} className="skeleton text-sm text-blue-800 md:text-lg font-bold ">
          {word}
        </span>
      ))}
    </div>
    </div>
  );
};

export default Loading;
