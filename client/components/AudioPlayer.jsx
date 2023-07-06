"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: "#waveform",
  waveColor: "#eee",
  progressColor: "#FF8C00",
  cursorColor: "OrangeRed",
  barWidth: 2,
  barRadius: 0,
  responsive: true,
  height: 50,
  normalize: true,
  partialRender: true,
});
const AudioPlayer = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const url =
    "https://bafybeid4ohzop2c7f2ikw4f6ormul4u6dh7yh5k5txv7ntboeazujunrra.ipfs.dweb.link/%5BFREE%5D%20Gunna%20Type%20Beat%202023%20-%20paybach.mp3";

  useEffect(() => {
    create();
    console.log("Run");

    // return () => {
    //   if (wavesurfer.current) {
    //     wavesurfer.current.destroy();
    //   }
    // };
  }, []);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);
  };

  const handlePlayPause = () => {
    setPlaying((prev) => {
      return !prev;
    });
    wavesurfer.current.playPause();
  };

  return (
    <div>
      <div className="bg-dark-charcoal  rounded-md p-5">
        <div className="flex items-center gap-3 h-10">
          {playing ? (
            <img onClick={handlePlayPause} src="/assets/pause.png" width={50} />
          ) : (
            <img onClick={handlePlayPause} src="/assets/play.png" width={50} />
          )}

          <div
            id="waveform"
            ref={waveformRef}
            className="flex-1 flex flex-col h-8 "
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
