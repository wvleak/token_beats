"use client";

import { useState } from "react";
import { useStateContext } from "../../context";

const SellBeats = () => {
  const { address, publishBeat } = useStateContext();
  const [form, setForm] = useState({
    title: "",
    maxSupply: "",
    usdPrice: "",
    uri: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await publishBeat(form);
    //add publisher in database
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleFormFieldChange("title", e)}
        />
        <input
          type="text"
          onChange={(e) => handleFormFieldChange("maxSupply", e)}
        />
        <input
          type="text"
          onChange={(e) => handleFormFieldChange("usdPrice", e)}
        />
        <input type="text" onChange={(e) => handleFormFieldChange("uri", e)} />
        <button type="submit" className="bg-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SellBeats;
