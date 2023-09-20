// Import Swiper React components
import Carousel from "react-elastic-carousel";

const CustomCarousel = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  return (
    <>
      <Carousel breakPoints={breakPoints}>
        <div className="h-[300px] w-[200px] bg-white">Item 1</div>
        <div className="h-[300px] w-[200px]">Item 1</div>
        <div className="h-[300px] w-[200px]">Item 1</div>
        <div className="h-[300px] w-[200px]">Item 1</div>
        <div className="h-[300px] w-[200px]">Item 1</div>
        <div className="h-[300px] w-[200px]">Item 1</div>
        <div className="h-[300px] w-[200px]">Item 1</div>
        <div className="h-[300px] w-[200px]">Item 1</div>
      </Carousel>
    </>
  );
};

export default CustomCarousel;
