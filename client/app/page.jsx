"use client";
// Import necessary modules and components
import { useStateContext } from "@context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BeatsCarousel from "../components/pages/Home/BeatsCarousel";
import Hero from "../components/pages/Home/Hero";

// Define the HomePage component
const HomePage = () => {
  // Access the state and functions from the context
  const { contract, address, getLastBeats } = useStateContext();
  const router = useRouter();

  // Initialize state variables
  const [isLoading, setIsLoading] = useState(false);
  const [beats, setBeats] = useState([]);

  // Fetch the latest beats from the contract
  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getLastBeats();
    setBeats(data);
    setIsLoading(false);
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
        <BeatsCarousel
          beats={beats}
          onNavigation={handleNavigate}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </section>
    </>
  );
};

export default HomePage;
