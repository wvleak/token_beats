import AudioPlayer from "@components/AudioPlayer/AudioPlayer";

const AudioSection = ({ url }) => {
  return (
    <>
      <div className="w-[80%] sm:max-w-[1000px] place-self-start text-white">
        <AudioPlayer url={url} />
      </div>
    </>
  );
};

export default AudioSection;
