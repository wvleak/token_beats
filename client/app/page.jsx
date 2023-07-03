"use client";

import { useStateContext } from "@context";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import BeatCard from "../components/BeatCard";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);
  const { contract, address, getBeats } = useStateContext();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getBeats();
    setBeats(data);
    setIsLoading(false);
    console.log(beats);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);

  const handleClick = () => {
    router.push(`/beats`);
  };
  return (
    <section className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="head_text text-center">
          Buy or Publish
          <br className="max-md:hidden" />
          <span
            className={
              address
                ? "orange_gradient text-center"
                : "bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-center"
            }
          >
            {" "}
            Token Type-Beats
          </span>
        </h1>
        <p className="desc text-center">
          With TokenBeat, find the perfect beat for your project or sell your
          latest creations. There's no need for intermediaries - it's all
          managed by the blockchain.
        </p>
      </div>
      <div className="relative group flex mt-8">
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75
          group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        ></div>
        <button
          onClick={handleClick}
          className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
        >
          <span className="flex items-center space-x-5">
            <img
              src="/assets/logo-svg.svg"
              alt="logo"
              className="object-contain max-w-[50px] h-auto"
            />
            <span className="pr-6 text-gray-100"> Explore Beats</span>
          </span>
          <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
            See the latest releases &rarr;
          </span>
        </button>
      </div>
      <div className="mt-[100px]">
        <h1 className="text-white">New beats</h1>
        <Carousel
          responsive={responsive}
          className="w-[1000px] h-[400px] text-white"
        >
          {/* <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div> */}
          {!isLoading &&
            beats.length > 0 &&
            beats.map((beat) => (
              <BeatCard
                key={beat.beatId}
                {...beat}
                handleClick={() => handleNavigate(beat)}
              />
            ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Home;
