import { observer } from "mobx-react";
import type { NextPage } from "next";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import ClaimLogin from "../components/claim/claimLogin";
import style from "./home.module.scss";
import Faq from "../components/faq/faq";
import AirdropBanner from "../components/airdrop/airdropBanner";
import AuthBanner from "../components/authBanner/authBanner";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const Home: NextPage = observer((props) => {
  const { setUser, user } = useInjection(UserStore);
  const getUser = async () => {
    try {
      const res: AxiosResponse = await axios.get("https://frensly.adev.co/", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(user);
  return (
    <div className={style.main__page}>
      <AuthBanner />
      {/* <AirdropBanner /> */}
      {/* <ClaimLogin />
      <Faq/> */}
    </div>
  );
});

export default Home;
