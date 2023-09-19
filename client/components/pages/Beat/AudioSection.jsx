import React from "react";
import AudioPlayer from "@components/AudioPlayer/AudioPlayer";

// The AudioSection component renders an AudioPlayer with a given URL.
const AudioSection = ({ url }) => {
  return (
    <div className="w-[80%] sm:max-w-[1000px] place-self-start text-white">
      {/* Pass the URL to the AudioPlayer component */}
      <AudioPlayer url={url} />
    </div>
  );
};

export default AudioSection;
