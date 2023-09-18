import Link from "next/link";
import Tag from "@components/atoms/Tag";

const BeatDetails = ({ beat, image, producer, tags }) => {
  return (
    <div className="flex flex-col gap-5 w-[350px] p-7 bg-[#3a3a4368] rounded-[10px]">
      <img src={image} className="w-[288px]" />
      <h1 className="text-white text-4xl">{beat.name}</h1>
      <p className="text-gray-500 text-lg ">Produced by: </p>

      <section className="flex gap-3 ">
        {producer.image != "" ? (
          <img src={producer.image} className="h-10 w-10 rounded-full" />
        ) : (
          ""
        )}
        <div className="max-w-[288px] truncate text-white">
          <Link className="mt-2" href={`/profile/${beat.producer}`}>
            {producer.username != "" ? (
              <span className="hover:text-gray-400 ">{producer.username}</span>
            ) : (
              <span className="hover:text-gray-400 mt-3">{beat.producer}</span>
            )}
          </Link>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <p className="text-gray-500 text-lg ">Tags </p>
        <ul className="flex text-white">
          {tags.map((tag, index) => (
            <Tag tag={tag} index={index} input={false} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BeatDetails;
