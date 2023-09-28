import Link from "next/link";
import Tag from "@components/atoms/Tag";

const BeatCardLayout = ({ producerInfo, beatInfo }) => {
  return (
    <div className="w-[288px] bg-[#1c1c24] hover:shadow-2xl hover:shadow-[#ffffff52] transition duration-200 cursor-pointer rounded-md">
      {beatInfo.image ? (
        <img
          src={beatInfo.image}
          className="w-full h-[288px] object-cover rounded-md"
        />
      ) : (
        <img
          src="https://www.billboard.com/wp-content/uploads/media/kanye-west-the-life-of-pablo-album-2016-billboard-1024.jpg?w=1024"
          alt="beatImage"
          className="w-full h-[288px] object-cover rounded-md"
        />
      )}

      <div className="flex flex-col p-4">
        <div className="block">
          {/* Render beat name */}
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {beatInfo.name}
          </h3>
          <div className="mt-[5px] font-epilogue text-sm text-[#808191] text-left leading-[18px] truncate">
            <div className="group">
              {/* Render producer information with link */}
              <Link
                className="flex gap-2"
                href={`/profile/${producerInfo.address}`}
              >
                {producerInfo.image ? (
                  <img
                    src={producerInfo.image}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  ""
                )}
                {producerInfo.username ? (
                  <span className="mt-2 group-hover:text-gray-400">
                    {producerInfo.username}
                  </span>
                ) : (
                  <span className="mt-2 group-hover:text-gray-400 truncate">
                    {producerInfo.address}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            {/* Render supply left */}
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Supply left {beatInfo.supplyLeft.toString()}
            </p>
          </div>
          <div className="flex flex-col">
            {/* Render beat price */}
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {beatInfo.usdPrice.toString()}$
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-2">
          {/* Render tags */}
          <ul className="flex text-white">
            {beatInfo.tags.map((tag, index) => (
              <Tag tag={tag} index={index} input={false} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeatCardLayout;
