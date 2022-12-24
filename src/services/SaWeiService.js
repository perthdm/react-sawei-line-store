import axios from "axios";
import { API_ENDPOINT, getLineProfile } from "utils/utility";

const ENDPOINT = {
  GET_MENUES: `${API_ENDPOINT}/menu`,
  SIGN_UP: `${API_ENDPOINT}/customer/sign-up`,
};

const SaWeiService = {
  getMenues: () => {
    return axios({ method: "GET", url: ENDPOINT.GET_MENUES });
  },

  signUp: () => {
    return axios({
      method: "POST",
      url: ENDPOINT.SIGN_UP,
      data: getLineProfile(),
    });
  },
};

export default SaWeiService;
