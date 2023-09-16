"use client";

import { useStateContext } from "@context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import BeatsCarousel from "../components/pages/Home/BeatsCarousel";
import Hero from "../components/pages/Home/Hero";

const HomePage = () => {
  const { contract, address, getAllBeats, getLastBeats } = useStateContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [beats, setBeats] = useState([]);
  const fetchBeats = async () => {
    setIsLoading(true);
    const data = await getLastBeats();
    setBeats(data);
    setIsLoading(false);
    console.log(beats);
  };
  useEffect(() => {
    if (contract) fetchBeats();
  }, [address, contract]);

  const handleClick = () => {
    router.push(`/beats`);
  };
  const handleNavigate = (beat) => {
    router.push(`/beats/${beat.id}`);
  };

  return (
    <>
      <section className="flex flex-col gap-8 items-center">
        <Hero onClick={handleClick} address={address} />
        <BeatsCarousel beats={beats} onNavigation={handleNavigate} />
      </section>
    </>
  );
};

export default HomePage;
