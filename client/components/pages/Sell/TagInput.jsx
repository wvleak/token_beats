import React from "react";
import Label from "../../atoms/Label";
import Tag from "../../atoms/Tag";

// The TagInput component allows users to input and display tags.
const TagInput = ({ tags, addTags, removeTags }) => {
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
              // Render Tag component for each tag
              <Tag
                key={index}
                tag={tag}
                index={index}
                input={true}
                onClick={removeTags}
              />
            ))}
          </ul>
          <input
            required
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
