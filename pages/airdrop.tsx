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
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Profile from "../components/profile/profile";
import Airdrop from "../components/profile/airdrop";

const AirdropPage: NextPage = observer((props) => {

  return (
    <div className={style.main__page}>
      {/* <Rooms/> */}
      <Airdrop/>
      {/* <AuthBanner /> */}
      {/* <AirdropBanner /> */}
      {/* <ClaimLogin />
      <Faq/> */}
    </div>
  );
});

export default AirdropPage;
