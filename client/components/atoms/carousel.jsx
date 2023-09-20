import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

// The Carousel component displays a set of cards with navigation buttons.
const Carousel = ({ cards }) => {
  // Define the initial range for card display.
  const [range, setRange] = useState({
    startRange: 0,
    endRange: 3,
  });

  // Calculate the total number of cards.
  const cardsLength = cards.length;

  // Function to move to the next set of cards.
  const next = () => {
    if (range.endRange < cardsLength) {
      setRange({
        startRange: range.startRange + 1,
        endRange: range.endRange + 1,
      });
    }
  };

  // Function to move to the previous set of cards.
  const prev = () => {
    if (range.startRange > 0) {
      setRange({
        startRange: range.startRange - 1,
        endRange: range.endRange - 1,
      });
    }
  };

  return (
    <div className="relative flex flex-row h-[500px]">
      {/* Render the "Previous" button if there are previous cards */}
      {range.startRange === 0 ? null : (
        <NavigateBeforeIcon
          fontSize="large"
          className="text-white cursor-pointer self-center absolute left-4 transition-transform transform hover:scale-110 z-10"
          onClick={prev}
        />
      )}

      <div className="flex flex-row gap-4">
        {/* Display the cards within the specified range */}
        {cards.slice(range.startRange, range.endRange).map((card, index) => (
          <div
            key={index}
            className="transition-transform transform hover:scale-110"
          >
            {card}
          </div>
        ))}
      </div>

      {/* Render the "Next" button if there are more cards */}
      {range.endRange === cardsLength ? null : (
        <NavigateNextIcon
          fontSize="large"
          className="text-white cursor-pointer self-center absolute right-4 transition-transform transform hover:scale-110 z-10"
          onClick={next}
        />
      )}
    </div>
  );
};

export default Carousel;
