"use client";

import { useState } from "react";
import { useStateContext } from "../../context";
import FormField from "@components/FormField";
import CustomButton from "@components/CustomButton";

import { create as ipfsHttpClient } from "ipfs-http-client";

const SellBeats = () => {
  /* IPFS STORAGE*/

  // const projectId = process.env.INFURA_KEY;
  // const projectSecret = process.env.INFURA_SECRET;
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
    // const base64 = await convertToBase64(file);
    //console.log(base64);
    // setUser({ ...user, image: base64 });
    // console.log(user);
    //setPostImage({ ...postImage, myFile: base64 });
    //console.log(postImage);

    const result = await ipfs.add(file);
    console.log(result);
    setFiles({ ...files, [fieldname]: result.path });
    console.log(files);
  };

  const onClick = async () => {
    const jsonData = { example: "data" };
    const json = JSON.stringify(jsonData);
    const bufferData = Buffer.from(JSON.stringify(jsonData));

    console.log(json);
    console.log(bufferData);

    const result = await ipfs.add(json);
    console.log(result);
    // const files = (form[0]).files;

    // if (!files || files.length === 0) {
    //   return alert("No files selected");
    // }

    // const file = files[0];
    // // upload files
    // const result = await ipfs.add(file);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form[0]);
    const files = form[0].files;
    console.log(files[0]);

    // if (!files || files.length === 0) {
    //   return alert("No files selected");
    // }

    // const file = files[0];
    // // upload files
    // const result = await ipfs.add(file);

    // setImages([
    //   ...images,
    //   {
    //     cid: result.cid,
    //     path: result.path,
    //   },
    // ]);

    // form.reset();
  };

  /** */
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

    // await setForm({ ...form, uri: uri });
    // console.log(form.uri);

    await publishBeat({ ...form, uri: uri });
    //add publisher in database
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {/* {isLoading && "Loading..."} */}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Sell a Beat
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Beat Title *"
            placeholder="Gunna Type Beat"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          <FormField
            labelName="Thumbnail *"
            placeholder="Write a title"
            inputType="text"
            value={"https://tokenbeat.infura-ipfs.io/ipfs/" + files.image}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <label className="flex-1 w-full flex flex-col">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
              Upload to IPFS
            </span>
            <input
              accept="image/*"
              onChange={(e) => handleFileUpload("image", e)}
              type="file"
              step="0.1"
              className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] "
            />
          </label>
        </div>
        <FormField
          labelName="Tags *"
          placeholder="Write your tags"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Supply *"
            placeholder="25"
            inputType="text"
            value={form.maxSupply}
            handleChange={(e) => handleFormFieldChange("maxSupply", e)}
          />
          <FormField
            labelName="Price (usd) *"
            placeholder="50$"
            inputType="text"
            value={form.usdPrice}
            handleChange={(e) => handleFormFieldChange("usdPrice", e)}
          />
        </div>

        <FormField
          labelName="mp3/wav *"
          placeholder="Place image URL of your campaign"
          inputType="text"
          value={"https://tokenbeat.infura-ipfs.io/ipfs/" + files.audio}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <label className="flex-1 w-full flex flex-col">
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            Upload to IPFS
          </span>
          <input
            accept="audio/*"
            onChange={(e) => handleFileUpload("audio", e)}
            type="file"
            step="0.1"
            className=" py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] "
          />
        </label>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="List"
            styles="bg-[#1dc071] text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default SellBeats;
