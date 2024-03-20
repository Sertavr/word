import React from "react";
import "../../style/header/header.css";
const Header = ({darkTheme}) => {
  return (
    <header>
      <div className={`header ${darkTheme ? 'dark-theme' : ''}`}>
        <h1>GUESS THE WORD</h1>
      </div>
    </header>
  );
};

export default Header;
//hhkjhkjh
