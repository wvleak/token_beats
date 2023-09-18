"use client";
import { useState, useEffect } from "react";
import { useStateContext } from "@context";
import DisplayBeats from "@components/Displays/DisplayBeats";

const Beats = () => {
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
    beats.forEach((beat) => {});
  }, [address, contract]);

  const searchBeats = async () => {
    const data = await getTags();
    console.log("Data", data);

    if (inputValue) {
      setBeats(allBeats.filter((beat) => beat.name == inputValue));
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
  const tags = ["hiphop", "test"];
  const getTags = async () => {
    const tagsString = tags.join(",");
    try {
      const response = await fetch(`/api/beats/tags?tags=${tagsString}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={searchBeats}>Get Value</button>
      </div>
      <DisplayBeats title="All Beats" isLoading={isLoading} beats={beats} />
    </div>
  );
};

export default Beats;
