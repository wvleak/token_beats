"use client";

import DisplayBeats from "@components/DisplayBeats";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import CustomButton from "@components/CustomButton";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);

  const { contract, address, getProducerBeats } = useStateContext();

  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getProducerBeats(address);
    setBeats(data);
    setIsLoading(false);
    console.log(beats);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);
  return (
    <div>
      <div className="bg-[#1c1c24] flex rounded-md w-full">
        <div className="">
          <img src="/assets/profile.jpg" className="rounded-full" />
        </div>
        <div>
          <h1 className="text-white">Producer name</h1>
        </div>
        <CustomButton
          btnType="button"
          title="Edit"
          styles="bg-[#1dc071] text-white"
        />
      </div>

      <DisplayBeats
        title="Producer Beats"
        isLoading={isLoading}
        beats={beats}
      />
    </div>
  );
};

export default page;
