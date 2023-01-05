import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { setLiffMessageOrder, getLineProfile } from "utils/utility";

import UIStore from "views/UIStore";
import UICart from "../views/UICart";
import Footer from "../layouts/Footer";

const liff = window.liff;

const Content = ({ step, onCheckout, onBack }) => {
  const [itemCart, setItemCart] = useState([]);
  const [summaryData, setSummaryData] = useState({ price: 0, amount: 0 });
  const [payment, setPayment] = useState(1);

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

  const handleSubmitOrder = async () => {
    console.log("CART ==> ", itemCart);
    console.log("PAYMENT ==> ", payment);

    const {
      delivery_to: { soi, address },
    } = getLineProfile();

    if (soi === "empty" || address === "empty") {
      return Swal.fire(
        "ลองใหม่อีกครั้ง",
        "กรุณาเพิ่มที่อยู่ในการจัดส่งด้านบน",
        "warning"
      );
    }

    const str = setLiffMessageOrder(
      itemCart,
      summaryData,
      { soi, address },
      payment
    );

    liff
      .sendMessages([
        {
          type: "text",
          text: str,
        },
      ])
      .then(() => {
        Swal.fire("สำเร็จ!", "ยืนยันคำสั่งซื้อสำเร็จ", "success");
        setItemCart([]);
        onBack();
      })
      .catch((err) => {
        Swal.fire("สำเร็จ!", "เกิดข้อผิดพลาด", "error");
      });
  };

  return (
    <>
      <div
        style={{
          maxHeight: "90vh",
          overflowY: "scroll",
          padding: "1rem 0.5rem 0rem 0.5rem",
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
            payment={payment}
            setPayment={setPayment}
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
