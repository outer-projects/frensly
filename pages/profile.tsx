import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Profile from "../components/profile/profile";

const AirdropPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      {/* <Rooms/> */}
      <Profile />
      {/* <AuthBanner /> */}
      {/* <AirdropBanner /> */}
      {/* <ClaimLogin />
      <Faq/> */}
    </div>
  );
});

export default AirdropPage;
