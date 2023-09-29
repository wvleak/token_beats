import CustomButton from "@components/atoms/CustomButton";
import FormField from "@components/atoms/FormField";

const EditForm = ({ onSubmit, onFormFieldChange, username }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full mt-[65px] flex flex-col gap-[30px]"
    >
      <div className="flex justify-center ">
        <FormField
          labelName="Username *"
          placeholder="Your username..."
          inputType="text"
          value={username}
          handleChange={(e) => onFormFieldChange("username", e)}
        />
      </div>

      <div className="flex justify-center items-center mt-[40px]">
        <CustomButton
          btnType="submit"
          title="submit"
          styles="bg-[#EE5B2F] text-white"
        />
      </div>
    </form>
  );
};

export default EditForm;
