import { useRouter } from "next/navigation";
import { useState } from "react";

// The SearchBar component provides a search input for beats.
const SearchBar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  // Function to handle input changes
  const handleInputChange = (e) => {
    // Update the state with the new input value
    setInputValue(e.target.value);
  };

  // Function to handle Enter key press
  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the Enter key's default behavior
      // Construct the search URL and navigate to it
      router.push(`/beats?tags=${inputValue}`);
      // You can add additional logic here to filter the beats if needed
    }
  };

  return (
    <div className="relative flex items-center w-[50%] max-w-[500px] sm:min-w-[200px] h-[45px] rounded-lg bg-dark-charcoal mt-5 ml-5 md:lg:mr-[30%]">
      <img
        src="/assets/search.svg"
        className="absolute ml-2"
        alt="Search Icon"
      />
      <input
        type="text"
        onKeyUp={handleInputKeyUp}
        onChange={handleInputChange}
        placeholder="Search for tags"
        className="h-[50px] pl-10 bg-transparent w-full outline-none text-white"
      />
    </div>
  );
};

export default SearchBar;
