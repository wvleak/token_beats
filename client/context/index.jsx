import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x805817A89535B3556f0B6d78F01Aa7a0e1891F90"
  );
  const { mutateAsync: listBeat, isLoading } = useContractWrite(
    contract,
    "listBeat"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishBeat = async (form) => {
    try {
      const data = await listBeat({
        args: [form.title, form.maxSupply, form.usdPrice, form.uri],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  const buyBeat = async (beatId, price) => {
    try {
      const data = await contract.call("buyBeat", [beatId], {
        value: ethers.utils.parseEther(price),
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getBeats = async () => {
    const beats = await contract.call("getBeats");

    const parsedBeats = beats.map((beat) => ({
      id: beat.beatId,
      name: beat.name,
      producer: beat.producer,
      maxSupply: beat.maxSupply,
      usdPrice: beat.usdPrice,
      sales: beat.sales,
      uri: beat.uri,
    }));

    return parsedBeats;
  };

  const getProducerBeats = async (producerAddress) => {
    const allBeats = await getBeats();

    const filteredBeats = allBeats.filter(
      (beat) => beat.producer === producerAddress
    );

    return filteredBeats;
  };

  //TODO get owned beats

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        publishBeat,
        buyBeat,
        getBeats,
        getProducerBeats,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
