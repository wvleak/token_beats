"use client";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/DisplayBeats";

const Beats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);

  const { contract, address, getAllBeats } = useStateContext();

  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getAllBeats();
    setBeats(data);
    setIsLoading(false);
    console.log(beats);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);

  return (
    <div>
      <DisplayBeats title="All Beats" isLoading={isLoading} beats={beats} />
    </div>
  );
};

export default Beats;
