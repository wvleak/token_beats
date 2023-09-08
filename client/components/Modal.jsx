import CustomButton from "./atoms/CustomButton";
import { useRouter } from "next/navigation";

const Modal = ({ open, confirmed, onClose, transaction }) => {
  const router = useRouter();
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors
      text-white  
      ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div className="bg-white h-[200px] w-[400px] rounded-md flex justify-center items-center ">
        {confirmed ? (
          <div className="flex-col">
            <p className="text-green-600">Transaction confirmed</p>
            <div className="flex gap-5">
              <CustomButton
                btnType="button"
                title={`${transaction} again`}
                styles="bg-black"
                handleClick={onClose}
              />
              <CustomButton
                btnType="button"
                title="Ok"
                styles="bg-green-600"
                handleClick={() => router.push("/")}
              />
            </div>
          </div>
        ) : (
          <div className="flex-col gap-9">
            <p className="text-red-600 mb-5">Transaction failed</p>
            <div className="flex gap-5">
              <CustomButton
                btnType="button"
                title="Cancel"
                styles="bg-red-600"
                handleClick={() => router.push("/")}
              />
              <CustomButton
                btnType="button"
                title="Retry"
                styles="bg-black"
                handleClick={onClose}
              />
            </div>
          </div>
        )}
        <button>test</button>
      </div>
    </div>
  );
};

export default Modal;
