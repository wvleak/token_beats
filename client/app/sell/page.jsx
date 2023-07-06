"use client";

import { useState } from "react";
import { useStateContext } from "../../context";
import FormField from "@components/FormField";
import CustomButton from "@components/CustomButton";

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
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Thumbnail *"
            placeholder="Write a title"
            inputType="file"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
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
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="Price (usd) *"
            placeholder="50$"
            inputType="text"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="mp3/wav *"
          placeholder="Place image URL of your campaign"
          inputType="file"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="List your beat"
            styles="bg-[#1dc071] text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default SellBeats;
