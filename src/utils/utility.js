export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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
