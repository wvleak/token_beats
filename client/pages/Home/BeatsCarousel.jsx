import Carousel from "@components/atoms/carousel";
import BeatCard from "@components/BeatCard/BeatCard";

const BeatsCarousel = ({ beats, onNavigation }) => {
  return (
    <div className="mt-[100px] min-w-[500px] max-w-[1000px] ">
      <h1 className="text-white">New beats</h1>
      <Carousel
        cards={beats.map((beat) => (
          <BeatCard
            key={beat.id}
            {...beat}
            onClick={() => onNavigation(beat)}
          />
        ))}
      ></Carousel>
    </div>
  );
};

export default BeatsCarousel;
