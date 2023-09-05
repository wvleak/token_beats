"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "@context";

import BeatCardLayout from "./BeatCardLayout";

const BeatCard = ({
  producer,
  maxSupply,
  usdPrice,
  sales,
  uri,
  handleClick,
}) => {
  const { getUserProfile } = useStateContext();

  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(uri);
      const data = response.data;
      setImage(data.image);
    };
    fetchImage();
  }, []);

  const supplyLeft = maxSupply - sales;

  const beatInfo = {
    image: image,
    supplyLeft: supplyLeft,
    usdPrice: usdPrice,
  };

  const [producerInfo, setProducerInfo] = useState({
    address: producer,
    username: "",
    image: "",
  });

  useEffect(() => {
    const setProducerProfile = async () => {
      const data = await getUserProfile(producer);
      if (data) {
        setProducerInfo({
          ...producerInfo,
          username: data.username,
          image: data.image,
        });
      }
    };
    setProducerProfile();
  }, [producer]);

  return (
    <div onClick={handleClick}>
      <BeatCardLayout producerInfo={producerInfo} beatInfo={beatInfo} />
    </div>
  );
};

export default BeatCard;
