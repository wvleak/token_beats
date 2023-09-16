"use client";

import { useStateContext } from "@context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingScreen from "@components/Displays/LoadingScreen";
import BeatDetails from "@components/pages/Beat/BeatDetails";
import AudioSection from "@components/pages/Beat/AudioSection";
import BuyingSection from "@components/pages/Beat/BuyingSection";
import Modal from "@components/Displays/Modal";

const BeatPage = ({ params }) => {
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
        const response = await axios.get(beat.uri);
        const data = response.data;
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

  const [isConfirmed, setIsConfirmed] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ethPrice = await getEthPrice(price);
    console.log(ethPrice.toString());

    setIsLoading(true);
    const confirmation = await buyBeat(params.beatId, ethPrice.toString());
    setIsLoading(false);
    setIsConfirmed(confirmation);
    toggleOpen();
    //router.push("/");

    console.log("Submit");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="flex items-center gap-5 w-full">
      {isLoading && <LoadingScreen />}
      <Modal
        open={isOpen}
        confirmed={isConfirmed}
        onClose={toggleOpen}
        transaction="Buy"
      />
      <BeatDetails beat={beat} image={image} producer={producer} />
      <div className="flex-col w-[80%]">
        <AudioSection url={audio} />
        <BuyingSection supply={supply} price={price} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default BeatPage;
