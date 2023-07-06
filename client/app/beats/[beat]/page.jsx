"use client";

import { useStateContext } from "@context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AudioPlayer from "@components/AudioPlayer";

const BeatDetails = ({ params }) => {
  const { buyBeat } = useStateContext();
  const [beatId, setBeatId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await buyBeat(beatId, price);

    console.log("Submit");
  };
  console.log(JSON.stringify(params.beat));

  //console.log(JSON.parse(router.query.beat));
  return (
    <div className="flex flex-col gap-8 mt-[90px]">
      <div className="flex flex-row  gap-5 md:w-[800px] lg:w-[1000px]">
        <div className="w-[288px]">
          <img src="https://www.billboard.com/wp-content/uploads/media/kanye-west-the-life-of-pablo-album-2016-billboard-1024.jpg?w=1024" />
        </div>
        <div className="flex-1 flex flex-col ml-10 gap-3 max-h-[288px]">
          <h1 className="text-white">Title</h1>
          <h1 className="text-white">Producer</h1>
          <h1 className="text-white">Supply left</h1>
          <h1 className="text-white">Price</h1>
          <h1 className="text-white">Tags</h1>
          <AudioPlayer />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-white">Player</p>

        <button
          className="bg-white max-w-[288px]"
          type="submit"
          onClick={handleSubmit}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default BeatDetails;
