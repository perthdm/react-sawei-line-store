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
    line_id: getStorage("line_id"),
    name: getStorage("line_name"),
    img: getStorage("line_img"),
    line_status: getStorage("line_status"),
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
