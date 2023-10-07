import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Airdrop from "../components/claimMenu/airdrop";

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
