import ReactPlayer from "react-player";

const VideoGallery = () => {
  const videoUrls = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    "https://www.youtube.com/watch?v=L_jWHffIx5E",
  ];

  return (
    <div className="flex items-center justify-center py-7">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {videoUrls.map((url:string, index:any) => (
          <div
            key={index}
            className="w-12 h-12 sm:h-20 sm:w-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full bg-black overflow-hidden shadow-lg flex items-center justify-center"
          >
        
            <ReactPlayer
              url={url}
              playing={true}
              muted={true}
              loop={true}
              width="150%"
              height="150%"
              className="rounded-full"
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1, // Removes YouTube logo
                    showinfo: 0,       // Hides video info
                    controls: 0,       // Disables controls
                    rel: 0,            // No related videos
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
