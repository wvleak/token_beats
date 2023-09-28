import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "@context";

function useBeatInfo(beats, setIsLoading) {
  const { getUserProfile, getBeatTags } = useStateContext();
  const [beatsWithInfo, setBeatsWithInfo] = useState([]);

  useEffect(() => {
    const fetchBeatInfo = async () => {
      setIsLoading(true);
      const beatsInfoPromises = beats.map(async (beat) => {
        const producerInfoResponse = await getUserProfile(beat.producer);
        const producerInfo = {
          ...producerInfoResponse,
          address: beat.producer, // Add the address property
        };
        let tags = [];
        const data = await getBeatTags(beat.name);
        if (data) {
          tags = data.tags;
        }
        const imageResponse = await axios.get(beat.uri); // Fetch the image
        const supplyLeft = beat.maxSupply - beat.sales; // Calculate supplyLeft

        return {
          ...beat,
          producerInfo,
          tags,
          image: imageResponse.data.image, // Add the image property
          supplyLeft: supplyLeft, // Add the supplyLeft property
        };
      });

      // Wait for all beat info to be fetched
      const beatsWithFullInfo = await Promise.all(beatsInfoPromises);
      await setBeatsWithInfo(beatsWithFullInfo);
      setIsLoading(false);
    };

    fetchBeatInfo();
  }, [beats]);

  return beatsWithInfo;
}

export default useBeatInfo;
