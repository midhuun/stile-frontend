import ReactPlayer from "react-player";
const VideoGallery = () => {
  const videoUrls = [
    "/video1.mp4",
    "/video2.mp4",
    "/video3.mp4",
    "/video4.mp4",
    "/video5.mp4",
  ];
  return (
    <div className="flex items-center justify-center h-auto pt-12 pb-2">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {videoUrls.map((url: string, index: number) => (
          <div
            key={index}
            className="w-12 h-12 sm:h-20 sm:w-20 md:w-28 relative md:h-28   rounded-full object-top bg-black overflow-hidden shadow-lg flex items-center justify-center"
          >
            {/* Skeleton Loader */}
            <div className="absolute w-full h-full bg-gray-300 animate-pulse"></div>
            {/* Video Player */}
            <ReactPlayer
              url={url}
              playing={true}
              muted={true}
              loop={true}
              width="150%"
              height="100%"
              className="rounded-full"
              style={{ objectFit: "cover", position: "relative", zIndex: 10 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
