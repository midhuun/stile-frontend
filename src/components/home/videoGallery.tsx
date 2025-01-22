import ReactPlayer from "react-player";
const VideoGallery = () => {
  const videoUrls = [
    "https://youtube.com/shorts/W1s35CWimk8?si=ft9q6V-qofpOxpAs",
    "https://youtube.com/shorts/Yz0sva-D5gU?si=5RIrd5wSp3q3JutR",
    "https://youtube.com/shorts/nC3NONnjA8U?si=DzN2QORSUrUkaTBv",
    "https://youtube.com/shorts/FIMBIe4K8JU?si=92pTgEZ5PyfdQE24",
    "https://youtube.com/shorts/CbO8JpD_Q8M?si=ZwKugTKgkwT8DcH0",
  ];
  return (
    <div className="flex items-center justify-center h-auto pt-12 pb-2">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {videoUrls.map((url: string, index: number) => (
          <div
            key={index}
            className="w-12 h-12 sm:h-20 sm:w-20 md:w-28 relative md:h-28 lg:w-36 lg:h-36 rounded-full object-top bg-black overflow-hidden shadow-lg flex items-center justify-center"
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
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1, // Removes YouTube logo
                    showinfo: 0, // Hides video info
                    controls: 0, // Disables controls
                    rel: 0, // No related videos
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
