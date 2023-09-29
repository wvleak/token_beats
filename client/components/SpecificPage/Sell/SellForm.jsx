import FormField from "@components/atoms/FormField";
import CustomButton from "@components/atoms/CustomButton";
import TagInput from "@components/SpecificPage/Sell/TagInput";

const SellForm = ({
  onFormFieldChange,
  onFileUpload,
  onSubmit,
  form,
  tags,
  addTags,
  removeTags,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full mt-[65px] flex flex-col gap-[30px]"
    >
      <div className="flex flex-wrap gap-[40px]">
        <FormField
          labelName="Beat Title *"
          placeholder="Gunna Type Beat"
          inputType="text"
          value={form.title}
          handleChange={(e) => onFormFieldChange("title", e)}
        />
        <FormField
          labelName="Thumbnail *"
          inputType="file"
          fileType="image"
          onFileUpload={onFileUpload}
        />
      </div>

      <TagInput tags={tags} addTags={addTags} removeTags={removeTags} />

      <div className="flex flex-wrap gap-[40px]">
        <FormField
          labelName="Supply *"
          placeholder="25"
          inputType="text"
          value={form.maxSupply}
          handleChange={(e) => onFormFieldChange("maxSupply", e)}
        />
        <FormField
          labelName="Price (usd) *"
          placeholder="50$"
          inputType="text"
          value={form.usdPrice}
          handleChange={(e) => onFormFieldChange("usdPrice", e)}
        />
      </div>
      <FormField
        labelName="mp3/wav *"
        inputType="file"
        fileType="audio"
        onFileUpload={onFileUpload}
      />

      <div className="flex justify-center items-center mt-[40px]">
        <CustomButton
          btnType="submit"
          title="List"
          styles="bg-[#EE5B2F] text-white"
        />
      </div>
    </form>
  );
};

export default SellForm;
