import Navbar from "../components/Navbar";
import React from "react";

export const PrivateLayout = ({ children, ...rest }) => {
  return (
    <div>
      <Navbar />
      <br />
      <div className="main">{children}</div>
    </div>
  );
};
