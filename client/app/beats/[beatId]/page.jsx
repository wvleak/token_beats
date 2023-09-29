"use client";

import { useStateContext } from "@context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingScreen from "@components/Displays/LoadingScreen";
import BeatDetails from "@components/SpecificPage/Beat/BeatDetails";
import AudioSection from "@components/SpecificPage/Beat/AudioSection";
import BuyingSection from "@components/SpecificPage/Beat/BuyingSection";
import Modal from "@components/Displays/Modal";
import SkeletonLoadingInfo from "@components/SpecificPage/Beat/SkeletonLoadingInfo";

const BeatPage = ({ params }) => {
  // Access required functions and data from the context
  const {
    buyBeat,
    getUserProfile,
    getBeat,
    contract,
    getEthPrice,
    getBeatTags,
  } = useStateContext();

  const [isBuying, setIsBuying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [beat, setBeat] = useState({});
  const [image, setImage] = useState("");
  const [producer, setProducer] = useState({ username: "", image: "" });
  const [audio, setAudio] = useState("");
  const [price, setPrice] = useState("");
  const [supply, setSupply] = useState("");
  const [tags, setTags] = useState([]);
  const router = useRouter();

  // Fetch beat details when the contract is available
  useEffect(() => {
    const fetchBeat = async () => {
      if (typeof contract !== "undefined") {
        const data = await getBeat(params.beatId);
        setBeat(data[0]);
      }
      setIsLoading(false);
    };
    fetchBeat();
  }, [contract, params.beatId]);

  // Fetch additional beat information once beat details are available
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

  // Fetch producer profile information
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
  }, [beat, producer, getUserProfile]);

  // Fetch tags associated with the beat
  useEffect(() => {
    const setBeatTags = async () => {
      const data = await getBeatTags(beat.name);
      if (data) {
        setTags(data.tags);
      }
    };
    setBeatTags();
  }, [beat.name, getBeatTags]);

  const [isConfirmed, setIsConfirmed] = useState(null);

  // Handle the submission of the purchase form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ethPrice = await getEthPrice(price);
    setIsBuying(true);
    const confirmation = await buyBeat(params.beatId, ethPrice.toString());
    setIsBuying(false);
    setIsConfirmed(confirmation);
    toggleOpen();
  };

  const [isOpen, setIsOpen] = useState(false);

  // Toggle the modal open/close
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-5 w-full">
      {isBuying && <LoadingScreen text="Transaction is in progress" />}
      {isLoading ? (
        <SkeletonLoadingInfo />
      ) : (
        <>
          <Modal
            open={isOpen}
            confirmed={isConfirmed}
            onClose={toggleOpen}
            transaction="Buy"
          />
          <BeatDetails
            beat={beat}
            image={image}
            producer={producer}
            tags={tags}
          />
          <div className="flex-col w-[80%] self-start">
            <AudioSection url={audio} />
            <BuyingSection
              supply={supply}
              price={price}
              onSubmit={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BeatPage;
