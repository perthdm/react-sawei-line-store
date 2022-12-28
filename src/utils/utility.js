const liff = window.liff;

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
    delivery_to: { soi: getStorage("soi"), address: getStorage("adress") },
  };

  if (obj) {
    return obj;
  }
};

export const getName = () => {
  const name = getStorage("line_name");
  return name ? name : "Mr.Tester Sa-Wei";
};

export const getImgProfile = () => {
  const img = getStorage("line_img");
  return img ? img : "img";
};

export const getLineId = () => {
  const line_id = getStorage("line_id");
  return line_id ? line_id : "line_id";
};

export const getSoi = () => {
  const soi = getStorage("soi");

  return soi ? soi : "";
};

export const getAddress = () => {
  const address = getStorage("address");

  return address ? address : "";
};

export const sendLiffOrder = (itemCart) => {
  let str = "";

  for (let i = 0; i < itemCart.length; i++) {
    const item = itemCart[i];

    str += `${item.name} ${item.selected ? item.selected.name : ""} ${
      item.amount
    } ${item.info ? item.info : ""} ${i != itemCart.length - 1 ? "\n" : ""}`;
  }

  // console.log(str);

  if (liff.isLoggedIn()) {
    liff
      .sendMessages([
        {
          type: "text",
          text: str,
        },
      ])
      .then(() => {
        console.log("message sent");
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
};
