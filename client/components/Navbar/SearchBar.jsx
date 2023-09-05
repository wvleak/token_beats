const SearchBar = () => {
  return (
    <div className="relative flex items-center w-[50%] max-w-[500px] sm:min-w-[200px] h-[45px] rounded-lg bg-dark-charcoal mt-5 ml-5 md: lg:mr-[30%]">
      <img src="/assets/search.svg" className="absolute ml-2" />
      <input
        type="text"
        placeholder="Search for beats"
        className="h-[50px]  pl-10 bg-transparent w-full outline-none text-white"
      />
    </div>
  );
};

export default SearchBar;
