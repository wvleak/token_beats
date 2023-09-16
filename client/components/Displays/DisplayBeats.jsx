import { useRouter } from "next/navigation";

import BeatCard from "../BeatCard/BeatCard";
import Title from "../atoms/Title";
import Loader from "../atoms/Loader";

const DisplayBeats = ({ title, isLoading, beats }) => {
  const router = useRouter();
  const handleNavigate = (beat) => {
    router.push(`/beats/${beat.id}`);
  };

  return (
    <>
      <Title title={`${title} (${beats.length})`} styles="text-white" />
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {/* Loader */}
        {isLoading && <Loader styles="w-[100px] h-[100px] object-contain" />}

        {/* No Beats display */}
        {!isLoading && beats.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any beats yet
          </p>
        )}

        {/* Beats display */}
        {!isLoading &&
          beats.length > 0 &&
          beats.map((beat) => (
            <BeatCard
              key={beat.beatId}
              {...beat}
              handleClick={() => handleNavigate(beat)}
            />
          ))}
      </div>
    </>
  );
};

export default DisplayBeats;
