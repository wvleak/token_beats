import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowForwardIos";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const Carousel = ({ cards }) => {
  const [range, setRange] = useState({
    startRange: 0,
    endRange: 3,
  });

  const cardsLength = cards.length;
  const next = () => {
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
      {/* <svg data-testid="ArrowForwardIosIcon"></svg> */}
      {/* <img
        className="w-10 h-10 mr-3 self-center rotate-180"
        src="assets/arrow.png"
        onClick={prev}
      /> */}
      {range.startRange == 0 ? null : (
        <NavigateBeforeIcon
          fontSize="large"
          className="text-white cursor-pointer self-center"
          onClick={prev}
        />
      )}
      {/* <NavigateBeforeIcon
        fontSize="large"
        className="text-white cursor-pointer self-center"
        onClick={prev}
      /> */}
      <div className="flex flex-row gap-4">
        {cards.slice(range.startRange, range.endRange).map((card) => card)}
      </div>
      {/* <img
        className="w-10 h-10 ml-3 self-center"
        src="assets/arrow.png"
        onClick={next}
      /> */}
      {/* <NavigateNextIcon
        fontSize="large"
        className="text-white cursor-pointer self-center"
        onClick={next}
      /> */}
      {range.endRange == cardsLength ? null : (
        <NavigateNextIcon
          fontSize="large"
          className="text-white cursor-pointer self-center"
          onClick={next}
        />
      )}
    </div>
  );
};

export default Carousel;
