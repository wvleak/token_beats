import CancelSharpIcon from "@mui/icons-material/CancelSharp";

const Tag = ({ tag, index, input, onClick }) => {
  const iconStyle = {
    fontSize: 16,
  };
  return (
    <li
      key={index}
      className="bg-[#3a3a43] rounded-full mr-1 py-1 px-4 flex items-center"
    >
      <span className="tag-title text-sm text-[#808191] font-epilogue">
        #{tag}
      </span>
      <span className="tag-close-icon" onClick={() => onClick(index)}>
        {input ? <CancelSharpIcon style={iconStyle} /> : null}
      </span>
    </li>
  );
};

export default Tag;
