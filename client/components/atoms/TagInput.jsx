"use client";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const TagInput = () => {
  const [tags, setTags] = useState(["Test"]);
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
  return (
    <>
      <div className="flex items-start flex-wrap rounded-md w-[480px] min-h-[48px]">
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                <CloseIcon />
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown={handleInputKeyDown}
          placeholder="Press enter to add tags"
        />
      </div>
    </>
  );
};

export default TagInput;
