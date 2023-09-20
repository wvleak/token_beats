import Carousel from "@components/atoms/carousel";
import BeatCard from "@components/BeatCard/BeatCard";
import useBeatInfo from "@utils/useBeatInfo";

// The BeatsCarousel component displays a carousel of new beats.
const BeatsCarousel = ({ beats, onNavigation, isLoading }) => {
  const beatsWithInfo = useBeatInfo(beats);

  return (
    <div className="mt-[100px] min-w-[500px] max-w-[1000px]">
      <h1 className="text-white">{isLoading ? "Loading..." : "New beats"}</h1>

      <Carousel
        cards={beatsWithInfo.map((beat) => (
          // Render BeatCard component for each beat with full info
          <BeatCard
            key={beat.id}
            beat={beat}
            onClick={() => onNavigation(beat)}
          />
        ))}
      />
    </div>
  );
};

export default BeatsCarousel;
