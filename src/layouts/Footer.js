import React, { useEffect, useState } from "react";
import { Button } from "antd";

// base-color #FF884B
// inactive #818c9d

const Footer = ({ itemCart, onCheckout, sumData }) => {
  return (
    <div
      style={{
        height: "70px",
        color: "#FFD384",
        position: "fixed",
        width: "100%",
        bottom: 0,
        zIndex: 100,
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Button
        style={{
          width: "90%",
          textAlign: "left",
          backgroundColor: "#83633f",
          color: "white",
          height: "45px"
        }}
        onClick={onCheckout}
      >
        ตะกร้าสินค้า - {sumData?.amount} ชิ้น{" "}
        <div style={{ position: "absolute", right: 15, top: 11 }}>
          ฿{sumData?.price}
        </div>
      </Button>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
