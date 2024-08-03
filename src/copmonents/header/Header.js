import React from "react";
import "../../style/header/header.css";
import { IoSettingsSharp } from "react-icons/io5";
const Header = ({darkTheme}) => {
  return (
    <header>
      <div className={`header ${darkTheme ? "dark-theme" : ""}`}>
        <h1>GUESS THE WORD</h1>
        <IoSettingsSharp
          className={darkTheme ? "settings dark-theme" : "settings"}
        />
      </div>
    </header>
  );
};

export default Header;

