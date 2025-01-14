import './Loading.css'; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="fixed min-h-screen w-full top-0 z-[1000] bg-white flex flex-col justify-center items-center">
      <div className="spinner"></div>
      <p className='pt-10 font-semibold text-lg text-gray-700'>Loading...</p>
    </div>
  );
};

export default Loading;
