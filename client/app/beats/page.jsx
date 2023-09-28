"use client";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/Displays/DisplayBeats";

import { useSearchParams } from "next/navigation";

const Beats = () => {
  const searchParams = useSearchParams();

  const tags = searchParams.get("tags");

  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);
  const [allBeats, setAllBeats] = useState([]);

  const { contract, address, getAllBeats } = useStateContext();

  // Fetch beats from the blockchain contract
  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getAllBeats();
    setBeats(data);
    setAllBeats(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // Trigger fetching beats when the contract, address, or component mounts
    if (contract) fetchBeats();
  }, [address, contract]);

  useEffect(() => {
    // Search for beats based on tags when tags or beats change
    searchBeats(tags);
  }, [beats, tags]);

  const searchBeats = async (tagsToSearch) => {
    let taggedBeats = [];
    if (tagsToSearch) {
      taggedBeats = await getTags(tagsToSearch);
    }

    if (tagsToSearch) {
      setBeats(allBeats.filter((beat) => taggedBeats.includes(beat.name)));
    } else {
      setBeats(allBeats);
    }
  };

  // Function to get tags from the API
  const getTags = async (input) => {
    try {
      const response = await fetch(`/api/beats/tags/${input}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const taggedBeats = data.map((beat) => beat.title);

        return taggedBeats;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Display the list of beats */}
      <DisplayBeats
        title="All Beats"
        isLoading={isLoading}
        beats={beats}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Beats;
