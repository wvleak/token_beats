import { useRouter } from "next/navigation";

import BeatCard from "./BeatCard";

const DisplayBeats = ({ title, isLoading, beats }) => {
  const router = useRouter();

  const handleNavigate = (beat) => {
    router.query.beat = beat.id;
    router.push(`/beats/${beat.id}`);
    // router.push({
    //   pathname: "/destination-page",
    //   query: { beatId: beat.beatId /* other query parameters if needed */ },
    // });
    // router.push({
    //   pathname: "/",
    //   query: { param1: 'value1', param2: 'value2' },
    // });
  };
  return (
    <div>
      <h1 className="text-white">
        {title} ({beats.length})
      </h1>
      <button
        type="button"
        onClick={() => {
          router.push({
            pathname: `/beats/[beat]`,
            query: { beat: beats },
          });
        }}
      >
        Click here to read more
      </button>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src="/assets/loader.svg"
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && beats.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any beats yet
          </p>
        )}

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
    </div>
  );
};

export default DisplayBeats;
