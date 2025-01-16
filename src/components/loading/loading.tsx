import './loading.css'; // Import the CSS file for styling

const Loading = () => {
  
  const loadingWords = ["Finding the perfect fit for you", "..."];
  return (
    <div className="fixed min-h-screen w-full top-0 z-[1000] bg-white flex flex-col justify-center items-center">
     <div className="spinner ">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
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
