"use client";

import { useStateContext } from "@context";
import { useState } from "react";

const BeatDetails = () => {
  const { buyBeat } = useStateContext();
  const [beatId, setBeatId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await buyBeat(beatId, price);

    console.log("Submit");
  };
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
