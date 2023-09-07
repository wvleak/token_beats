"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStateContext } from "../../context";
import { create as ipfsHttpClient } from "ipfs-http-client";
import LoadingScreen from "@components/LoadingScreen";
import Title from "@components/atoms/Title";
import SellForm from "@pages/Sell/SellForm";
import Modal from "@components/Modal";

const SellBeats = () => {
  const [isLoading, setIsLoading] = useState(false);

  /* IPFS STORAGE*/
  const projectId = "2SFF4D03ldKvI9gk6ujC2pQraVi";
  const projectSecret = "45b64f101091b1c06c24ee6d78ba7fc7";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001",
    headers: {
      authorization,
    },
  });

  const [files, setFiles] = useState({ image: "", audio: "" });
  const handleFileUpload = async (fieldname, e) => {
    const file = e.target.files[0];
    //setIsLoading(true);
    const result = await ipfs.add(file);
    //setIsLoading(false);
    setFiles({ ...files, [fieldname]: result.path });
  };

  const [form, setForm] = useState({
    title: "",
    maxSupply: "",
    usdPrice: "",
    uri: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const { publishBeat } = useStateContext();
  const [isConfirmed, setIsConfirmed] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nftMetadata = {
      name: form.title,
      description: "Token Type Beat",
      image: "https://tokenbeat.infura-ipfs.io/ipfs/" + files.image,
      animation_url: "https://tokenbeat.infura-ipfs.io/ipfs/" + files.audio,
    };

    const jsonMetadata = JSON.stringify(nftMetadata);
    const result = await ipfs.add(jsonMetadata);
    console.log(result);

    const uri = "https://tokenbeat.infura-ipfs.io/ipfs/" + result.path;
    console.log(uri);

    setIsLoading(true);
    const confirmation = await publishBeat({ ...form, uri: uri });
    setIsLoading(false);
    setIsConfirmed(confirmation);
    toggleOpen();
    // if (confirmation) {
    //   router.push("/");
    // }
    //add publisher in database
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <LoadingScreen />}
      <Modal open={isOpen} confirmed={isConfirmed} onClose={toggleOpen} />

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
      />
    </div>
  );
};

export default SellBeats;
