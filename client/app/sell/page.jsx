"use client";
import { useState } from "react";
import { useStateContext } from "../../context";
import { create as ipfsHttpClient } from "ipfs-http-client";
import LoadingScreen from "@components/Displays/LoadingScreen";
import Title from "@components/atoms/Title";
import SellForm from "@components/pages/Sell/SellForm";
import Modal from "@components/Displays/Modal";

const SellBeats = () => {
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // IPFS configuration
  const projectId = "2SFF4D03ldKvI9gk6ujC2pQraVi";
  const projectSecret = "45b64f101091b1c06c24ee6d78ba7fc7";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001",
    headers: {
      authorization,
    },
  });

  // State for uploaded files
  const [files, setFiles] = useState({ image: "", audio: "" });

  // Handle file upload
  const handleFileUpload = async (fieldname, e) => {
    const file = e.target.files[0];
    const result = await ipfs.add(file);
    setFiles({ ...files, [fieldname]: result.path });
  };

  // State for form data
  const [form, setForm] = useState({
    title: "",
    maxSupply: "",
    usdPrice: "",
    uri: "",
  });

  // Handle form field changes
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  // Access the context to use functions
  const { publishBeat } = useStateContext();

  // State for confirmation modal
  const [isConfirmed, setIsConfirmed] = useState(null);

  // State for tags
  const [tags, setTags] = useState([]);

  // Remove a tag
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  // Add a tag
  const addTags = (e) => {
    if (e.target.value !== "") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare NFT metadata
    const nftMetadata = {
      name: form.title,
      description: "Token Type Beat",
      image: "https://tokenbeat.infura-ipfs.io/ipfs/" + files.image,
      animation_url: "https://tokenbeat.infura-ipfs.io/ipfs/" + files.audio,
    };

    // Convert metadata to JSON
    const jsonMetadata = JSON.stringify(nftMetadata);

    // Add metadata to IPFS
    const result = await ipfs.add(jsonMetadata);

    // Construct the URI for metadata
    const uri = "https://tokenbeat.infura-ipfs.io/ipfs/" + result.path;

    setIsLoading(true);

    // Publish the beat and get confirmation
    const confirmation = await publishBeat({ ...form, uri: uri });

    // Add beat and tags to the database
    try {
      const response = await fetch("/api/beats/new", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          tags: tags,
        }),
      });

      if (response.ok) {
        console.log("Beat added successfully to the database.");
      }
    } catch (error) {
      console.log("Error while adding beat to the database:", error);
    }

    setIsLoading(false);
    setIsConfirmed(confirmation);
    toggleOpen();
  };

  // State for modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <LoadingScreen />}
      <Modal
        open={isOpen}
        confirmed={isConfirmed}
        onClose={toggleOpen}
        transaction="Publish"
      />

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <Title
          title="Sell a Beat"
          styles="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white"
        />
      </div>

      <SellForm
        onSubmit={handleSubmit}
        onFormFieldChange={handleFormFieldChange}
        onFileUpload={handleFileUpload}
        form={form}
        tags={tags}
        addTags={addTags}
        removeTags={removeTags}
      />
    </div>
  );
};

export default SellBeats;
