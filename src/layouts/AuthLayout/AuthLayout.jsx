import Footer from "../components/Footer";
import React from "react";

export const AuthLayout = ({ children, ...rest }) => {
  return (
    <div>
      <div className="main">{children}</div>
      <br />
      <Footer />
    </div>
  );
};
