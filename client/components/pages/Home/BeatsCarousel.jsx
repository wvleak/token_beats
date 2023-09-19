import React from "react";
import Carousel from "@components/atoms/carousel";
import BeatCard from "@components/BeatCard/BeatCard";

// The BeatsCarousel component displays a carousel of new beats.
const BeatsCarousel = ({ beats, onNavigation, isLoading }) => {
  return (
    <div className="mt-[100px] min-w-[500px] max-w-[1000px]">
      <h1 className="text-white">{isLoading ? "Loading..." : "New beats"}</h1>

      <Carousel
        cards={beats.map((beat) => (
          // Render BeatCard component for each beat
          <BeatCard
            key={beat.id}
            {...beat}
            onClick={() => onNavigation(beat)}
          />
        ))}
      />
    </div>
  );
};

export default BeatsCarousel;
