"use client";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/Displays/DisplayBeats";

import { useSearchParams } from "next/navigation";

const Beats = () => {
  const searchParams = useSearchParams();

  const tags = searchParams.get("tags");
  //console.log("Search", search);

  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);
  const [allBeats, setAllBeats] = useState([]);

  const { contract, address, getAllBeats } = useStateContext();
  let beatsWithTags;

  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getAllBeats();
    setBeats(data);
    setAllBeats(data);
    setIsLoading(false);
    console.log(beats);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);

  useEffect(() => {
    searchBeats(tags);
  }, [beats, tags]);

  const searchBeats = async () => {
    let taggedBeats = [];
    if (tags) {
      taggedBeats = await getTags(tags);
    } else if (inputValue) {
      taggedBeats = await getTags(inputValue);
    }
    //const taggedBeats = await getTags(inputValue);
    // console.log("Data", data);

    if (inputValue) {
      //setBeats(allBeats.filter((beat) => beat.name == inputValue));
      setBeats(allBeats.filter((beat) => taggedBeats.includes(beat.name)));
    } else if (tags) {
      //setBeats(allBeats.filter((beat) => beat.name == inputValue));
      setBeats(allBeats.filter((beat) => taggedBeats.includes(beat.name)));
    } else {
      setBeats(allBeats);
    }
  };
  const [inputValue, setInputValue] = useState("");

  // Function to handle input changes
  const handleInputChange = (e) => {
    // Update the state with the new input value
    setInputValue(e.target.value);
  };

  //Get tags
  //const tags = ["HipHop", "test"];
  const getTags = async (input) => {
    console.log("Entered");
    //const tagsString = tags.join(",");
    try {
      const response = await fetch(`/api/beats/tags/${input}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        const taggedBeats = data.map((beat) => beat.title);
        console.log("allBeats", taggedBeats);

        return taggedBeats;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={searchBeats} className="bg-white">
          Get Value
        </button>
      </div>
      <DisplayBeats title="All Beats" isLoading={isLoading} beats={beats} />
    </div>
  );
};

export default Beats;
