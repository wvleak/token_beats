"use client";

import { useState, useEffect } from "react";
import { useStateContext } from "@context";

const SeeProfile = ({ params }) => {
  const [user, setUser] = useState("");
  const [beats, setBeats] = useState([]);

  const { getProducerBeats, contract } = useStateContext();
  //todo get beats from profile
  const fetchBeats = async () => {
    const data = await getProducerBeats(params.profile_address);
    setBeats(data);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`/api/profile/${user}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log("Went ok");
        console.log(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setUser(e.target.value)} />

      {/* <input
        type="file"
        onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
      /> */}
      <button className="bg-white" type="submit">
        submit
      </button>
    </form>
  );
};

export default SeeProfile;
