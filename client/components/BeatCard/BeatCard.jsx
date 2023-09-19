"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "@context";

import BeatCardLayout from "./BeatCardLayout";

const BeatCard = ({
  name,
  producer,
  maxSupply,
  usdPrice,
  sales,
  uri,
  onClick,
}) => {
  const { getUserProfile, getBeatTags } = useStateContext();
  const [tags, setTags] = useState([]);
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
    name: name,
    image: image,
    supplyLeft: supplyLeft,
    usdPrice: usdPrice,
    tags: tags,
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

  useEffect(() => {
    const setBeatTags = async () => {
      const data = await getBeatTags(name);
      if (data) {
        setTags(data.tags);
      }
    };
    setBeatTags();
  }, [name]);

  return (
    <div onClick={onClick}>
      <BeatCardLayout producerInfo={producerInfo} beatInfo={beatInfo} />
    </div>
  );
};

export default BeatCard;
