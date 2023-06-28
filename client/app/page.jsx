"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/beats`);
  };
  return (
    <div>
      <section className="flex justify-center">
        <div className="flex-column">
          <div className="flex-column mb-8">
            <h1 className=" text-white text-xl">
              A Place To Buy Beats From The World's Best Producers
            </h1>
            <h2 className="text-white">
              Find the perfect beat for your project
            </h2>
          </div>
          <div className="relative group">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75
          group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
            ></div>
            <button
              onClick={handleClick}
              className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
            >
              <span className="flex items-center space-x-5">
                <img src="/assets/logo.png" height={50} width={50} />
                <span className="pr-6 text-gray-100"> Explore Beats</span>
              </span>
              <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
                See the latest releases &rarr;
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="h-[1000px] bg-white mt-8">Top Producer</section>
      <section className="h-[1000px] bg-black">About section</section>
    </div>
  );
};

export default Home;
