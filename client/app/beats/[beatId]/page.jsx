"use client";

import { useStateContext } from "@context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AudioPlayer from "@components/AudioPlayer/AudioPlayer";
import axios from "axios";
import Link from "next/link";
import CustomButton from "@components/atoms/CustomButton";
import { create as ipfsClient } from "ipfs-http-client";
import LoadingScreen from "@components/LoadingScreen";

const BeatDetails = ({ params }) => {
  const { buyBeat, getUserProfile, getBeat, contract, getEthPrice } =
    useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [beat, setBeat] = useState({});
  const [image, setImage] = useState("");
  const [producer, setProducer] = useState({ username: "", image: "" });
  const [audio, setAudio] = useState("");
  const [price, setPrice] = useState("");
  const [supply, setSupply] = useState("");
  const router = useRouter();
  // const ipfs = ipfsClient({
  //   host: "ipfs.infura.io",
  //   port: 5001,
  //   protocol: "https",
  // });

  // const uri =
  //   "https://tokenbeat.infura-ipfs.io/ipfs/QmUHpgt7dE12cbMUuoR2ijR1XuaMJk8t6ssQRaRNESR42e";

  useEffect(() => {
    const fetchBeat = async () => {
      if (typeof contract !== "undefined") {
        const data = await getBeat(params.beatId);
        setBeat(data[0]);
      }
    };

    fetchBeat();
  }, [contract]);

  useEffect(() => {
    const fetchInfo = async () => {
      if (Object.keys(beat).length !== 0) {
        console.log("uri", beat);
        const response = await axios.get(beat.uri);
        const data = response.data;

        // const response = await ipfs.cat(uri);
        // const data = await response.text();
        console.log(data);
        //console.log(response.data.animation_url);
        setAudio(data.animation_url);
        setImage(data.image);
        setPrice(beat.usdPrice.toString());
        const supplyLeft = beat.maxSupply - beat.sales;
        setSupply(supplyLeft.toString());
      }
    };
    fetchInfo();
  }, [beat]);

  useEffect(() => {
    const setProducerProfile = async () => {
      const data = await getUserProfile(beat.producer);
      if (data) {
        setProducer({
          ...producer,
          username: data.username,
          image: data.image,
        });
      }
    };
    setProducerProfile();
  }, [beat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ethPrice = await getEthPrice(price);
    console.log(ethPrice.toString());

    setIsLoading(true);
    await buyBeat(params.beatId, ethPrice.toString());
    setIsLoading(false);
    router.push("/");

    console.log("Submit");
  };
  return (
    <div className="flex flex-col items-center gap-5">
      {isLoading && <LoadingScreen />}
      <div className="flex gap-8">
        <img src={image} className="w-[288px]" />
        <div className="flex flex-col gap-3">
          <h1 className="text-white text-5xl">{beat.name}</h1>
          <p className="text-gray-500 text-lg max-w-[300px] truncate">
            Produced by:{" "}
          </p>
          <div className="flex gap-3">
            {producer.image != "" ? (
              <img src={producer.image} className="h-10 w-10 rounded-full" />
            ) : (
              ""
            )}
            <Link className="mt-2" href={`/profile/${beat.producer}`}>
              {producer.username != "" ? (
                <span className="text-white hover:text-gray-400 ">
                  {producer.username}
                </span>
              ) : (
                <span className="text-white hover:text-gray-400 mt-3 ">
                  {beat.producer}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[80%] sm:max-w-[1000px] place-self-start text-white">
        <AudioPlayer url={audio} />
      </div>
      <p className="text-gray-500">Supply left:{supply}</p>
      <div className="flex gap-3">
        <p className="text-gray-500 mt-5">{price}$</p>
        <CustomButton
          btnType="buttion"
          title="Buy"
          handleClick={(e) => {
            handleSubmit(e);
          }}
          styles="bg-white"
        ></CustomButton>
      </div>
    </div>
  );
};

export default BeatDetails;
