import React from "react";
import { LogoWhiteTransparent } from "../assets";

const Header = () => {
  return (
    <div>
      <img src={LogoWhiteTransparent} style={{ height: 100 }} />
      <h1>Event Management System</h1>
    </div>
  );
};

export default Header;
