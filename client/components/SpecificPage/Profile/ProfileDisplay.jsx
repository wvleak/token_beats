import { useRouter } from "next/navigation";

const ProfileDisplay = ({ user, address }) => {
  const router = useRouter();
  return (
    <div
      className="bg-black/[.65] group flex gap-4 rounded-md w-full mb-11 p-4 relative hover:cursor-pointer"
      onClick={() => {
        router.push("/profile/edit");
      }}
    >
      <div
        className="absolute -z-10 -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75
          group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
      ></div>
      <div className="">
        {user.image === "" ? (
          <img
            src="/assets/profile.jpg"
            alt="user"
            className="w-[200px] h-[200px] rounded-full object-fit border-white border-4"
          />
        ) : (
          <img
            src={user.image}
            alt="user"
            className="w-[200px] h-[200px] rounded-full object-fit border-white border-4"
          />
        )}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {user.username === "" ? (
          <h1 className="text-white text-4xl">Anonyme</h1>
        ) : (
          <h1 className="text-white text-4xl">{user.username}</h1>
        )}
        <p className="text-gray-400">{address}</p>
      </div>
      <div className="grow"></div>
      <img
        src="/assets/pen.svg"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:cursor-pointer transition duration-300 ease-out"
        onClick={() => {
          router.push("/profile/edit");
        }}
      />
    </div>
  );
};

export default ProfileDisplay;
