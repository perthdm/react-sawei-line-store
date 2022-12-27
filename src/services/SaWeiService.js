import axios from "axios";
import { API_ENDPOINT, getLineProfile } from "utils/utility";

const ENDPOINT = {
  GET_MENUES: `${API_ENDPOINT}/menu`,
  SIGN_UP: `${API_ENDPOINT}/customer/sign-up`,
  UPDATE_ADDRESS: `${API_ENDPOINT}/customer/address`
};

const SaWeiService = {
  getMenues: () => {
    return axios({ method: "GET", url: ENDPOINT.GET_MENUES });
  },

  signUp: () => {
    return axios({
      method: "POST",
      url: ENDPOINT.SIGN_UP,
      data: getLineProfile()
    });
  },

  updateAddress: (data) => {
    return axios({
      method: "POST",
      url: ENDPOINT.UPDATE_ADDRESS,
      data
    });
  }
};

export default SaWeiService;
