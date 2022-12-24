import axios from "axios";
import { API_ENDPOINT } from "utils/utility";

const ENDPOINT = {
  GET_MENUES: `${API_ENDPOINT}/menu`
};

const SaWeiService = {
  getMenues: () => {
    return axios({ method: "GET", url: ENDPOINT.GET_MENUES });
  }
};

export default SaWeiService;
