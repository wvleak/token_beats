const AudioDisplay = ({ playing, togglePlay, waveformRef }) => {
  return (
    <div className="bg-dark-charcoal  rounded-md p-5">
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
