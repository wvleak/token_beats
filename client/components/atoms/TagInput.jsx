"use client";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Label from "./Label";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (e) => {
    if (e.target.value !== "") {
      setTags([...tags, e.target.value]);
      //props.selectedTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the Enter key's default behavior
      addTags(e);
      // You can also submit the form here if needed
    }
  };
  const iconStyle = {
    fontSize: 16, // Change this value to adjust the size
  };
  return (
    <>
      <Label labelName="Tags *">
        <div className="flex flex-wrap min-w-[300px] max-w-[670px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
          <ul className="flex">
            {tags.map((tag, index) => (
              <li key={index} className="bg-[#3a3a43] rounded-md mr-1 p-1 pl-2">
                <span className="tag-title">{tag}</span>
                <span
                  className="tag-close-icon"
                  onClick={() => removeTags(index)}
                >
                  <CancelSharpIcon style={iconStyle} />
                </span>
              </li>
            ))}
          </ul>
          <input
            type="text"
            onKeyDown={handleInputKeyDown}
            placeholder="Press Enter to Add Tags"
            className="outline-none bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264]"
          />
        </div>
      </Label>
    </>
  );
};

export default TagInput;
