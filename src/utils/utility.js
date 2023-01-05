export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const LIFF_ID = process.env.REACT_APP_LIFF_ID;

export const setStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getStorage = (key) => {
  return localStorage.getItem(key);
};

export const getLineProfile = () => {
  const obj = {
    _id: getStorage("_id"),
    line_id: getStorage("line_id"),
    name: getStorage("line_name"),
    img: getStorage("line_img"),
    line_status: getStorage("line_status"),
    delivery_to: { soi: getStorage("soi"), address: getStorage("address") },
  };

  if (obj) {
    return obj;
  }
};

export const setLiffMessageOrder = (
  itemCart,
  summaryData,
  deliveryTo,
  payment
) => {
  let str = "";

  for (let i = 0; i < itemCart.length; i++) {
    const item = itemCart[i];

    str += `- ${item.name} ${item.selected ? item.selected.name : ""} ${
      item.amount
    } ${item.info ? item.info : ""} ${i != itemCart.length - 1 ? "\n" : ""}`;
  }

  str += `\n ซอย: ${deliveryTo.soi} | บ้านเลขที่ ${
    deliveryTo.address
  } \n รวม: ${summaryData?.price} บาท (ชำระโดย ${
    payment === 1 ? "เงินสด" : "โอนเงิน"
  })`;
  // console.log(str);

  return str;
};

export const setOrderData = (itemInCart) => {
  let obj = [];

  for (let i = 0; i < itemInCart.length; i++) {
    const item = itemInCart[i];

    obj.push({
      menu_id: item._id,
      option_id: item.selected ? item.selected._id : null,
      amount: item.amount,
    });
  }

  return obj;
};
