import React from "react";
import PropTypes from "prop-types";
import { LeftOutlined, CoffeeOutlined } from "@ant-design/icons";

const Header = ({ step, onBack }) => {
  // Theme[purple] #5031cc white
  // Theme[Sa-wei] #83633f white

  return (
    <div
      style={{
        backgroundColor: "#83633f",
        textAlign: "center",
        minHeight: "6vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {step === 1 && (
        <LeftOutlined
          style={{ position: "absolute", left: "1rem", top: "1.1rem" }}
          onClick={onBack}
        />
      )}
      <span style={{ fontWeight: "bold" }}>
        SA-WEI
        <CoffeeOutlined style={{ fontSize: "18px", marginLeft: "5px" }} />
      </span>
    </div>
  );
};

Header.propTypes = {};

export default Header;
