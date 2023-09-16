"use client";

import { useState } from "react";
import Label from "../../atoms/Label";
import Tag from "../../atoms/Tag";

const TagInput = ({ tags, addTags, removeTags }) => {
  // const [tags, setTags] = useState([]);
  // const removeTags = (indexToRemove) => {
  //   setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  // };
  // const addTags = (e) => {
  //   if (e.target.value !== "") {
  //     setTags([...tags, e.target.value]);
  //     //props.selectedTags([...tags, e.target.value]);
  //     e.target.value = "";
  //   }
  // };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the Enter key's default behavior
      addTags(e);
      // You can also submit the form here if needed
    }
  };
  return (
    <>
      <Label labelName="Tags *">
        <div className="flex flex-wrap min-w-[300px] max-w-[670px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
          <ul className="flex">
            {tags.map((tag, index) => (
              <Tag tag={tag} index={index} input={true} onClick={removeTags} />
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
