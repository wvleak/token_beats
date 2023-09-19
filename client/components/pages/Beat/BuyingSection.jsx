import React from "react";
import CustomButton from "@components/atoms/CustomButton";
import MicNoneIcon from "@mui/icons-material/MicNone";
import LayersIcon from "@mui/icons-material/Layers";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import VideocamIcon from "@mui/icons-material/Videocam";
import RadioIcon from "@mui/icons-material/Radio";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";

// The BuyingSection component displays details about supply, price, and usage terms.
const BuyingSection = ({ supply, price, onSubmit }) => {
  return (
    <div className="max-w-[800px] mt-8 flex flex-col bg-[#3a3a4368] rounded-[10px] p-5 gap-5 divide-y divide-zinc-500">
      <div className="max-w-[800px] flex justify-between">
        {/* Display supply information */}
        <section className="flex flex-col items-center gap-2">
          <p className="text-white text-3xl">Supply left</p>
          <p className="text-white text-2xl">{supply}</p>
        </section>
        <div className="flex gap-3">
          {/* Display total price and Buy button */}
          <section className="flex flex-col">
            <p className="text-gray-500">Total:</p>
            <p className="text-white text-lg">{price}$</p>
          </section>
          <CustomButton
            btnType="button" // Typo corrected to "button"
            title="Buy"
            handleClick={(e) => {
              onSubmit(e);
            }}
            styles="bg-white"
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-white text-xl mt-2">Usage terms</h1>
        <ul className="flex justify-between flex-wrap gap-5 text-gray-500 text-xs">
          {/* Display usage terms */}
          <li>
            <MicNoneIcon fontSize="medium" />
            USED FOR MUSIC RECORDING
          </li>
          <li>
            <LayersIcon /> DISTRIBUTE UP TO UNLIMITED COPIES
          </li>
          <li>
            <PodcastsIcon /> UNLIMITED ONLINE AUDIO STREAMS
          </li>
          <li>
            <VideocamIcon /> UNLIMITED MUSIC VIDEO
          </li>
          <li>
            <RadioIcon /> RADIO BROADCASTING RIGHTS (UNLIMITED STATIONS)
          </li>
          <li>
            <MicExternalOnIcon /> FOR PROFIT LIVE PERFORMANCES
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BuyingSection;
