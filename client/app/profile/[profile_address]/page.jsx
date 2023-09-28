"use client";

import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/Displays/DisplayBeats";
import ProducerProfile from "@components/pages/Profile/ProducerProfile";

const SeeProfile = ({ params }) => {
  // Access required functions and data from the context
  const { getProducerBeats, contract, getUserProfile } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);
  const [user, setUser] = useState({ username: "", image: "" });

  // Fetch producer's beats when the contract is available
  useEffect(() => {
    const fetchBeats = async () => {
      setIsLoading(true);
      const data = await getProducerBeats(params.profile_address);
      setBeats(data);
      setIsLoading(false);
    };

    if (contract) {
      fetchBeats();
    }
  }, [contract, params.profile_address]);

  // Fetch producer's profile information
  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(params.profile_address);

      if (data) {
        setUser({ ...user, username: data.username, image: data.image });
      }
    };

    setUserProfile();
  }, [params.profile_address, getUserProfile, user]);

  return (
    <div className="w-full">
      <ProducerProfile user={user} params={params} />
      <DisplayBeats
        title="Producer Beats"
        isLoading={isLoading}
        beats={beats}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default SeeProfile;
