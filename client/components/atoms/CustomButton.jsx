const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={` h-[45px] w-[105px] rounded-md mt-1 brightness-100 hover:brightness-50 transition duration-100 ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
