import React from "react";
import Logo from "./assets/images/logo.jpg";

const Header = () => (
  <header
    style={{
      backgroundColor: "white",
      position: "fixed",
      width: "100%",
      top: 0,
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{ display: "flex", justifyContent: "space-between", width: "80%" }}
    >
      <img src={Logo} alt="MD logo" />
      <button>Help?</button>
    </div>
  </header>
);

export default Header;
