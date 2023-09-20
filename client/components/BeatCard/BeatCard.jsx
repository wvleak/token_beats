"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "@context";

import BeatCardLayout from "./BeatCardLayout";

const BeatCard = ({ beat, onClick }) => {
  return (
    <div onClick={onClick}>
      <BeatCardLayout producerInfo={beat.producerInfo} beatInfo={beat} />
    </div>
  );
};

export default BeatCard;
