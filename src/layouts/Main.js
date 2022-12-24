import React, { useState } from "react";
import Footer from "./Footer";
import Content from "./Content";
import Header from "./Header";
import { Button } from "antd";

const Main = () => {
  const [step, setStep] = useState(0);

  const handleBack = () => {
    setStep(0);
  };

  const handleCheckout = () => {
    setStep(1);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header step={step} onBack={handleBack} />
      <Content step={step} onCheckout={handleCheckout} />
    </div>
  );
};

export default Main;
