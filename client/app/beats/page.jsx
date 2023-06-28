"use client";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/DisplayBeats";

const Beats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);

  const { contract, address, getBeats } = useStateContext();

  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getBeats();
    setBeats(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);

  return <DisplayBeats title="All Beats" isLoading={isLoading} beats={beats} />;
};

export default Beats;
