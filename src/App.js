import { BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { setStorage, getStorage, LIFF_ID } from "./utils/utility";
import SaWeiService from "services/SaWeiService";
import Main from "layouts/Main";
const liff = window.liff;

const App = () => {
  useEffect(() => {
    // fetchLiff();
    // signUp();
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

      // liff
      //   .sendMessages([
      //     {
      //       type: "text",
      //       text: "Hello, World!"
      //     }
      //   ])
      //   .then(() => {
      //     console.log("message sent");
      //   })
      //   .catch((err) => {
      //     console.log("error", err);
      //   });
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

    if (response.status === 200) {
      const { address, soi, _id } = response.data;

      setStorage("soi", soi ? soi : null);
      setStorage("address", address ? address : null);
      setStorage("_id", _id ? _id : null);

      console.log("signup response ----> ", response);
    }
  };

  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default App;
