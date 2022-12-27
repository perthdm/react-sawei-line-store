import React, { useState } from "react";
import PropTypes from "prop-types";

import UIStore from "views/UIStore";
import UICart from "../views/UICart";
import Footer from "../layouts/Footer";

const Content = ({ step, onCheckout, onBack }) => {
  const [itemCart, setItemCart] = useState([]);

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
          />
        )}
      </div>

      {step === 0 && itemCart.length > 0 && (
        <Footer itemCart={itemCart} onCheckout={onCheckout} />
      )}
    </>
  );
};

Content.propTypes = {};

export default Content;
