import React from "react";
import "../App.css";

const CustomButton = ({
  customButtonStyle = {},
  buttontext = "",
  onClick = () => {},
  icon,
  isDisabled = false,
}) => {
  return (
    <div>
      <button
        className={`btn-style`}
        style={{
          ...customButtonStyle,
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        onClick={onClick}
        disabled={isDisabled}
      >
        {icon && <img src={icon} className={"icon_style"} />}

        {buttontext}
      </button>
    </div>
  );
};

export default CustomButton;
