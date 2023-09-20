import BeatCardLayout from "./BeatCardLayout";

const BeatCard = ({ beat, onClick }) => {
  return (
    <div onClick={onClick}>
      <BeatCardLayout producerInfo={beat.producerInfo} beatInfo={beat} />
    </div>
  );
};

export default BeatCard;
