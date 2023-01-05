import React, { useState, useEffect } from "react";
import { sendLiffOrder, getLineProfile } from "utils/utility";

import UIStore from "views/UIStore";
import UICart from "../views/UICart";
import Footer from "../layouts/Footer";

const Content = ({ step, onCheckout, onBack }) => {
  const [itemCart, setItemCart] = useState([]);
  const [summaryData, setSummaryData] = useState({ price: 0, amount: 0 });

  useEffect(() => {
    let price = 0;
    let amount = 0;
    itemCart.map((item) => {
      console.log(item);
      price += item?.selected
        ? item?.selected.price * item?.amount
        : item.price * item.amount;
      amount += item?.amount;
    });
    setSummaryData({ price, amount });
  }, [itemCart]);

  const handleSubmitOrder = () => {
    console.log("CART ==> ", itemCart);
    console.log("ADDRESS ==> ", getLineProfile());

    sendLiffOrder(itemCart);
  };

  return (
    <>
      <div
        style={{
          maxHeight: "90vh",
          overflowY: "scroll",
          padding: "1rem 0.5rem 0rem 0.5rem"
        }}
      >
        {step === 0 ? (
          <UIStore itemCart={itemCart} setItemCart={setItemCart} />
        ) : (
          <UICart
            itemCart={itemCart}
            setItemCart={setItemCart}
            onBack={onBack}
            sumData={summaryData}
          />
        )}
      </div>

      {itemCart.length > 0 && (
        <Footer
          onCheckout={onCheckout}
          sumData={summaryData}
          step={step}
          submitOrder={handleSubmitOrder}
        />
      )}
    </>
  );
};

Content.propTypes = {};

export default Content;
