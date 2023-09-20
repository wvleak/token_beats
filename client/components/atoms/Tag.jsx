import CancelSharpIcon from "@mui/icons-material/CancelSharp";

const Tag = ({ tag, index, input, onClick }) => {
  const iconStyle = {
    fontSize: 16, // Change this value to adjust the size
  };
  return (
    <li key={index} className="bg-[#3a3a43] rounded-md mr-1 p-1 pl-2">
      <span className="tag-title">#{tag}</span>
      <span className="tag-close-icon" onClick={() => onClick(index)}>
        {input ? <CancelSharpIcon style={iconStyle} /> : null}
      </span>
    </li>
  );
};

export default Tag;
