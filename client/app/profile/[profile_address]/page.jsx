"use client";

import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/DisplayBeats";
import ProducerProfile from "@pages/Profile/ProducerProfile";

const SeeProfile = ({ params }) => {
  const { getProducerBeats, contract, getUserProfile } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const [beats, setBeats] = useState([]);
  //todo get beats from profile
  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getProducerBeats(params.profile_address);
    setBeats(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [contract]);

  const [user, setUser] = useState({ username: "", image: "" });
  useEffect(() => {
    const setUserProfile = async () => {
      const data = await getUserProfile(params.profile_address);

      if (data) {
        setUser({ ...user, username: data.username, image: data.image });
      }
    };
    setUserProfile();
  }, []);

  return (
    <div>
      <ProducerProfile user={user} params={params} />
      <DisplayBeats
        title="Producer Beats"
        isLoading={isLoading}
        beats={beats}
      />
    </div>
  );
};

export default SeeProfile;
