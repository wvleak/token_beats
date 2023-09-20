import CustomButton from "@components/atoms/CustomButton";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

const LgLayout = ({ address, connect, disconnect, user, router }) => {
  return (
    <div className="text-white mr-[100px] sm:flex hidden flex-row justify-end gap-4 mt-4">
      <CustomButton
        btnType="button"
        title={address ? "Sell beats" : "Connect"}
        styles={
          address
            ? "bg-gradient-to-r from-red-500 to-orange-600"
            : "bg-gradient-to-r from-pink-500 to-purple-600"
        }
        handleClick={() => {
          if (address) router.push("/sell");
          else connect();
        }}
      />
      {address && (
        <div className="flex gap-5">
          <Link href="/profile">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
              {user.image === "" ? (
                <img
                  src="/assets/profile.jpg"
                  alt="user"
                  className="w-[100%] h-[100%] rounded-full object-fit brightness-100 hover:brightness-50 transition duration-100"
                />
              ) : (
                <img
                  src={user.image}
                  alt="user"
                  className="w-[100%] h-[100%] rounded-full object-fit brightness-100 hover:brightness-50 transition duration-100"
                />
              )}
            </div>
          </Link>
          <LogoutIcon
            onClick={disconnect}
            className="mt-4 cursor-pointer hover:text-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default LgLayout;
