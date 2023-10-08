import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Profile from "../components/claimMenu old/claimMenu";
import Explore from "../components/explore/explore";

const ExplorePage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      {/* <Rooms/> */}
      <Explore />
      {/* <AuthBanner /> */}
      {/* <AirdropBanner /> */}
      {/* <ClaimLogin />
      <Faq/> */}
    </div>
  );
});

export default ExplorePage;
