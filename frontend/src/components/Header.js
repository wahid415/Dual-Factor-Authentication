import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <header id="header-bar">
      <Link className="header-item" to="/">
        Home
      </Link>
    </header>
  );
};

export default Header;
