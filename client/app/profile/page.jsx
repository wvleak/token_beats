"use client";

import DisplayBeats from "@components/Displays/DisplayBeats";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import ProfileDisplay from "@components/pages/Profile/ProfileDisplay";

const Page = () => {
  // Initialize state and context
  const [isLoading, setIsLoading] = useState(false);
  const { contract, address, getProducerBeats, getUserProfile } =
    useStateContext();

  // Initialize beats and user state
  const [beats, setBeats] = useState([]);
  const [user, setUser] = useState({ username: "", image: "" });

  // Function to fetch the user's beats
  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getProducerBeats(address);
    setBeats(data);
    setIsLoading(false);
  };

  // Fetch beats when the contract or address changes
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);

  // Function to fetch and set the user profile
  const setUserProfile = async () => {
    const data = await getUserProfile(address);
    if (data) {
      setUser({ ...user, username: data.username, image: data.image });
    }
  };

  // Fetch and set user profile information
  useEffect(() => {
    setUserProfile();
  }, [address]);

  return (
    <>
      {/* Display the user's profile */}
      <ProfileDisplay user={user} address={address} />

      {/* Display the user's beats */}
      <DisplayBeats title="Your Beats" isLoading={isLoading} beats={beats} />
    </>
  );
};

export default Page;
