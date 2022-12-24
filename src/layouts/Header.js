import React from "react";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#5031cc",
        textAlign: "center",
        minHeight: "6vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <span style={{ fontWeight: "bold" }}> Sa-wei 121/195 S.29</span>
    </div>
  );
};

Header.propTypes = {};

export default Header;
