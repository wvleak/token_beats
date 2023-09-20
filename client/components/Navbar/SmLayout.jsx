import Link from "next/link";
import CustomButton from "@components/atoms/CustomButton";
import LogoutIcon from "@mui/icons-material/Logout";

const SmLayout = ({ toggleDrawer, toggle, connect, disconnect, address }) => {
  return (
    <div className="sm:hidden">
      <img
        src="/assets/menu.svg"
        className="min-w-[60px] h-[60px] mt-4"
        alt="menu"
        onClick={() => toggle((prev) => !prev)}
      />
      <div
        className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 
        ${
          !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-10"
        } transition-all duration-700`}
      >
        <ul className="mb-4">
          {address && (
            <Link href="/profile" className="flex gap-4 mx-4">
              <img
                src="/assets/profile.svg"
                alt="user"
                className="w-[40px] h-[40px] rounded-full object-fit grayscale hover:grayscale-0"
              />
              <p className="text-white font-bold text-[20px] my-auto">
                profile
              </p>
            </Link>
          )}
        </ul>
        <div className="flex mx-4 text-white">
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
        </div>
        <LogoutIcon
          onClick={disconnect}
          fontSize="large"
          className="cursor-pointer text-white ml-5 mt-4"
        />
      </div>
    </div>
  );
};

export default SmLayout;
