"use client";

import DisplayBeats from "@components/DisplayBeats";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import ProfileDisplay from "@pages/Profile/ProfileDisplay";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { contract, address, getProducerBeats, getUserProfile } =
    useStateContext();

  const [beats, setBeats] = useState([]);
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

  const [user, setUser] = useState({ username: "", image: "" });
  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(address);
      console.log("UseEffect:", data);
      if (data) {
        setUser({ ...user, username: data.username, image: data.image });
      }
    };
    setUserProfile();
  }, [address]);

  return (
    <>
      <ProfileDisplay user={user} address={address} />
      <DisplayBeats title="Your Beats" isLoading={isLoading} beats={beats} />
    </>
  );
};

export default page;
