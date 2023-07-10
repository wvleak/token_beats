import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { contract_abi } from "@utils/contract_abi";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x560ABE5FE6dbcC809112Eb0f1F3b52D4860975A6",
    contract_abi
  ); //"0x805817A89535B3556f0B6d78F01Aa7a0e1891F90"
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
    console.log("Entered buy beat");
    try {
      const data = await contract.call("buyBeat", [beatId], {
        value: price,
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getEthPrice = async (usdPrice) => {
    const ethPrice = await contract.call("getEthPrice", [usdPrice]);
    return ethPrice;
  };

  const getAllBeats = async () => {
    const beats = await contract.call("getAllBeats");

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
  const getLastBeats = async () => {
    const beats = await contract.call("getLastBeats");

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

  // const getLastBeats = async () => {
  //   try {
  //     const beats = await contract.call("getLastBeats");

  //     const parsedBeats = beats.map((beat) => ({
  //       id: beat.beatId,
  //       name: beat.name,
  //       producer: beat.producer,
  //       maxSupply: beat.maxSupply,
  //       usdPrice: beat.usdPrice,
  //       sales: beat.sales,
  //       uri: beat.uri,
  //     }));

  //     console.log("contract call success", data);
  //     return parsedBeats;
  //   } catch (error) {
  //     console.log("contract call failure", error);
  //     return [];
  //   }
  // };

  const getProducerBeats = async (producerAddress) => {
    const allBeats = await getAllBeats();

    const filteredBeats = allBeats.filter(
      (beat) => beat.producer === producerAddress
    );

    return filteredBeats;
  };

  const getBeat = async (beatId) => {
    const allBeats = await getAllBeats();

    const filteredBeats = allBeats.filter((beat) => beat.id == beatId);

    return filteredBeats;
  };

  const getUserProfile = async (userAddress) => {
    try {
      const response = await fetch(`/api/profile/${userAddress}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        return data;
      }
    } catch (error) {
      console.log(error);
    }
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
        getAllBeats,
        getLastBeats,
        getProducerBeats,
        getUserProfile,
        getBeat,
        getEthPrice,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
