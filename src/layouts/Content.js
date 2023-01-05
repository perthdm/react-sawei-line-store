import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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

      {step === 0 && itemCart.length > 0 && (
        <Footer
          itemCart={itemCart}
          onCheckout={onCheckout}
          sumData={summaryData}
        />
      )}
    </>
  );
};

Content.propTypes = {};

export default Content;
