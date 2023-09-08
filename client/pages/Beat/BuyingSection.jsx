import CustomButton from "@components/atoms/CustomButton";

const BuyingSection = ({ supply, price, onSubmit }) => {
  return (
    <div className="h-[450px] max-w-[800px] mt-8 flex flex-col bg-[#3a3a4368] rounded-[10px] p-5 gap-5 divide-y  divide-zinc-500">
      <div className="max-w-[800px] flex justify-between">
        <section className="flex flex-col items-center gap-2">
          <p className="text-white text-3xl">Supply left</p>
          <p className="text-white text-2xl">{supply}</p>
        </section>
        <div className="flex gap-3">
          <section className="flex flex-col">
            <p className="text-gray-500 ">Total:</p>
            <p className="text-white text-lg">{price}$</p>
          </section>
          <CustomButton
            btnType="buttion"
            title="Buy"
            handleClick={(e) => {
              onSubmit(e);
            }}
            styles="bg-white"
          ></CustomButton>
        </div>
      </div>
      <div>
        <h1 className="text-white text-xl mt-2 ">License terms</h1>
      </div>
    </div>
  );
};

export default BuyingSection;
