import Carousel from "@components/atoms/carousel";
import SkeletonLoader from "@components/atoms/SkeletonLoader";
import BeatCard from "@components/BeatCard/BeatCard";
import useBeatInfo from "@utils/useBeatInfo";

// The BeatsCarousel component displays a carousel of new beats.
const BeatsCarousel = ({ beats, onNavigation, isLoading, setIsLoading }) => {
  const beatsWithInfo = useBeatInfo(beats, setIsLoading);

  return (
    <div className="mt-[100px] min-w-[500px] max-w-[1000px]">
      <h1 className="text-white text-2xl">Last beats</h1>

      {isLoading ? (
        <SkeletonLoader count={3} />
      ) : (
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
      )}
    </div>
  );
};

export default BeatsCarousel;
