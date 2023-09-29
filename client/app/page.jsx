"use client";
// Import necessary modules and components
import { useStateContext } from "@context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BeatsCarousel from "../components/SpecificPage/Home/BeatsCarousel";
import Hero from "../components/SpecificPage/Home/Hero";

// Define the HomePage component
const HomePage = () => {
  // Access the state and functions from the context
  const { contract, address, getLastBeats } = useStateContext();
  const router = useRouter();

  // Initialize state variables
  const [isLoading, setIsLoading] = useState(true);
  const [beats, setBeats] = useState([]);

  // Fetch the latest beats from the contract
  const fetchBeats = async () => {
    //setIsLoading(true);
    const data = await getLastBeats();
    setBeats(data);
    // setIsLoading(false);
  };

  // Use useEffect to trigger fetching beats when contract or address changes
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);

  // Handle click event to navigate to the beats page
  const handleClick = () => {
    router.push("/beats");
  };

  // Handle beat navigation when clicked
  const handleNavigate = (beat) => {
    router.push(`/beats/${beat.id}`);
  };

  // Render the homepage components
  return (
    <>
      <section className="flex flex-col gap-8 items-center">
        <Hero onClick={handleClick} address={address} />
        <div className="bg-[#0202023b] w-screen border-y border-[#131313] mt-10">
          <h1 className="text-white text-[32px] mt-5 ml-10">Latest Releases</h1>
          <div className="flex flex-col items-center">
            <BeatsCarousel
              beats={beats}
              onNavigation={handleNavigate}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
