const AudioDisplay = ({ playing, togglePlay, waveformRef }) => {
  return (
    <div className="max-w-[800px] bg-black/[.65]  rounded-full p-5 relative">
      <div className="absolute -z-10 -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75"></div>
      <div className="flex items-center gap-3 h-10">
        {playing ? (
          <img onClick={togglePlay} src="/assets/pause.png" width={50} />
        ) : (
          <img onClick={togglePlay} src="/assets/play.png" width={50} />
        )}

        <div
          id="waveform"
          ref={waveformRef}
          className="flex-1 flex flex-col h-8 "
        ></div>
      </div>
    </div>
  );
};

export default AudioDisplay;
