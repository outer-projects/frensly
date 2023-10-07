import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Profile from "../components/claimMenu/claimMenu";

const AirdropPage: NextPage = observer((props) => {

  return (
    <div className={style.main__page}>
      {/* <Rooms/> */}
      <Profile/>
      {/* <AuthBanner /> */}
      {/* <AirdropBanner /> */}
      {/* <ClaimLogin />
      <Faq/> */}
    </div>
  );
});

export default AirdropPage;
