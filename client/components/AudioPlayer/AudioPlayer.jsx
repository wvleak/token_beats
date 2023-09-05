"use client";
import { useEffect, useRef, useState } from "react";
import AudioDisplay from "./AudioDisplay";
import formWaveSurferOptions from "@utils/wavesurfer";

const AudioPlayer = ({ url }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
  };

  useEffect(() => {
    if (url != "") {
      create();
    }
  }, [url]);

  const [playing, setPlaying] = useState(false);
  const handlePlayPause = () => {
    setPlaying((prev) => {
      return !prev;
    });
    wavesurfer.current.playPause();
  };

  return (
    <>
      <AudioDisplay
        playing={playing}
        togglePlay={handlePlayPause}
        waveformRef={waveformRef}
      />
    </>
  );
};

export default AudioPlayer;
