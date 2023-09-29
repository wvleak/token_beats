import React from "react";
import AudioPlayer from "@components/AudioPlayer/AudioPlayer";

// The AudioSection component renders an AudioPlayer with a given URL.
const AudioSection = ({ url }) => {
  return (
    <div className=" place-self-start text-white">
      {/* Pass the URL to the AudioPlayer component */}
      <AudioPlayer url={url} />
    </div>
  );
};

export default AudioSection;
