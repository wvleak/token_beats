import React, { useState } from "react";

const Carousel = ({ cards }) => {
  const [range, setRange] = useState({
    startRange: 0,
    endRange: 3,
  });

  const next = () => {
    const cardsLength = cards.length;
    console.log(
      "🚀 ~ file: carousel.jsx:11 ~ next ~ cardsLength:",
      cardsLength
    );
    console.log("range:", range.startRange);

    if (range.endRange < cardsLength) {
      setRange({ startRange: ++range.startRange, endRange: ++range.endRange });
    }
  };
  const prev = () => {
    console.log("range:", range.startRange);

    if (range.startRange > 0) {
      setRange({ startRange: --range.startRange, endRange: --range.endRange });
    }
  };

  return (
    <div className="flex flex-row">
      <img
        className="w-10 h-10 mr-3 self-center rotate-180"
        src="assets/arrow.png"
        onClick={prev}
      />
      <div className="flex flex-row gap-4">
        {cards.slice(range.startRange, range.endRange).map((card) => card)}
      </div>
      <img
        className="w-10 h-10 ml-3 self-center"
        src="assets/arrow.png"
        onClick={next}
      />
    </div>
  );
};

export default Carousel;
