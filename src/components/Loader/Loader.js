import React from "react";
import "./Loader.css"; // styling
import logo from '../../assests/logo2.png'

const Loader = () => {
  return (
    <div className="loader-container">
      <img
        src={logo}   // <-- put your logo inside public folder
        alt="Loading..."
        className="loader-logo"
      />
    </div>
  );
};

export default Loader;
