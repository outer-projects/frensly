import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import AuthBanner from "../components/authBanner/authBanner";
import { useInjection } from "inversify-react";
import Web3Store from "../stores/Web3Store";
import { UserStore } from "../stores/UserStore";
import { useEffect } from "react";

const Home: NextPage = observer((props) => {
  const { init } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  return (
    <div className={style.main__page}>
      {/* <Rooms/> */}
      {/* <Profile/> */}
      {(!init || !user.account) && <AuthBanner />}
      {/* <AirdropBanner /> */}
      {/* <ClaimLogin />
      <Faq/> */}
    </div>
  );
});

export default Home;
