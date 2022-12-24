import React, { useState } from "react";
import Footer from "./Footer";
import Content from "./Content";
import Header from "./Header";
import { Button } from "antd";

const Main = () => {
  const [active, setActive] = useState(1);

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Content active={active} />
      {/* <Footer active={active} setActive={setActive} /> */}
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
            backgroundColor: "#5031cc",
            color: "white",
            height: "45px"
          }}
        >
          ตระกร้าสินค้า - 1 ชิ้น{" "}
          <div style={{ position: "absolute", right: 15, top: 11 }}>฿15</div>
        </Button>
      </div>
    </div>
  );
};

export default Main;
