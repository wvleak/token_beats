const ProducerProfile = ({ user, params }) => {
  return (
    <div className="bg-black/[.65]  flex gap-4 rounded-md w-full mb-11 p-4 relative ">
      <div
        className="absolute -z-10 -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75
           "
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
        <p className="text-gray-400">{params.profile_address}</p>
      </div>
      <div className="grow"></div>
    </div>
  );
};

export default ProducerProfile;
