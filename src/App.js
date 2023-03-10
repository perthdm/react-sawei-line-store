import { BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { setStorage, getStorage, LIFF_ID } from "./utils/utility";
import SaWeiService from "services/SaWeiService";
import Main from "layouts/Main";
const liff = window.liff;

const App = () => {
  useEffect(() => {
    fetchLiff();
    signUp();
  }, []);

  const fetchLiff = async () => {
    await liff.init({ liffId: LIFF_ID }).catch((err) => {
      throw err;
    });

    if (liff.isLoggedIn()) {
      // liff.logout();
      let line_profile = await liff.getProfile();
      if (line_profile) {
        console.log("Profile -----> ", line_profile);

        setStorage("line_id", line_profile?.userId);
        setStorage("line_name", line_profile?.displayName);
        setStorage("line_img", line_profile?.pictureUrl);
        setStorage("line_status", line_profile?.statusMessage);
      }
    } else {
      liff.login();
    }
  };

  const signUp = async () => {
    const line_id = getStorage("line_id");

    if (!line_id) {
      liff.logout();
      // await fetchLiff(true);
    }

    const response = await SaWeiService.signUp();

    if (response.status === 201) {
      console.log("signup response ----> ", response);

      const { address, _id } = response.data;
      const nextData = { _id, soi: "empty", ads: "empty" };

      if (address) {
        nextData["soi"] = address?.soi ? address?.soi : "empty";
        nextData["ads"] = address?.address ? address?.address : "empty";
      }

      setStorage("soi", nextData.soi);
      setStorage("ads", nextData.ads);
      setStorage("_id", _id);
    }
  };

  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default App;
