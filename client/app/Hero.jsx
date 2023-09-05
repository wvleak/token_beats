const Hero = ({ onClick, address }) => {
  return (
    <>
      <div>
        <h1 className="head_text text-center">
          Buy or Publish
          <br className="max-md:hidden" />
          <span
            className={
              address
                ? "orange_gradient text-center"
                : "bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-center"
            }
          >
            {" "}
            Token Type-Beats
          </span>
        </h1>
        <p className="desc text-center">
          With TokenBeat, find the perfect beat for your project or sell your
          latest creations. There's no need for intermediaries - it's all
          managed by the blockchain.
        </p>
      </div>
      <div className="relative group flex mt-8">
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75
        group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        ></div>
        <button
          onClick={onClick}
          className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
        >
          <span className="flex items-center space-x-5">
            <img
              src="/assets/logo-svg.svg"
              alt="logo"
              className="object-contain max-w-[50px] h-auto"
            />
            <span className="pr-6 text-gray-100"> Explore Beats</span>
          </span>
          <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
            See the latest releases &rarr;
          </span>
        </button>
      </div>
    </>
  );
};

export default Hero;
