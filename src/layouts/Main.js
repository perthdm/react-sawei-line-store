import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import UIStoreWrapper from "views/UIStoreWrapper";
import UIHistory from "views/UIHistory";

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
      <Content>
        <Routes>
          <Route path="/" element={<></>} />
          <Route
            path="/store"
            element={
              <UIStoreWrapper
                step={step}
                onBack={handleBack}
                onCheckout={handleCheckout}
              />
            }
          />
          <Route path="/order-history" element={<UIHistory />} />
        </Routes>
      </Content>
    </div>
  );
};

export default Main;
