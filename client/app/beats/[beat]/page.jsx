"use client";

import { useStateContext } from "@context";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <input type="text" placeholder="beatId" />
      <button className="bg-white" type="submit" onClick={handleSubmit}>
        Buy
      </button>
    </div>
  );
};

export default BeatDetails;
