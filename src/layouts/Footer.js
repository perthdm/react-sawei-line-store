import React, { useEffect, useState } from "react";
import { Button } from "antd";

// base-color #FF884B
// inactive #818c9d

const Footer = ({ itemCart, onCheckout }) => {
  const [total, setTotal] = useState({});

  useEffect(() => {
    let price = 0;
    let amount = 0;
    itemCart.map((item) => {
      price += item?.total;
      amount += item?.amount;
    });
    setTotal({ amount, price });
  }, [itemCart]);

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
        ตะกร้าสินค้า - {total?.amount} ชิ้น{" "}
        <div style={{ position: "absolute", right: 15, top: 11 }}>
          ฿{total?.price}
        </div>
      </Button>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
