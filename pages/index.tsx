import { observer } from "mobx-react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import ClaimLogin from "../components/claim/claimLogin";
import style from "./home.module.scss";
import Faq from "../components/faq/faq";
import useTwitterOauth from "../components/hooks/useTwitterOauth";

const Home: NextPage = observer((props) => {

  return (
    <div className={style.main__page}>
      <ClaimLogin />
      <Faq/>
    </div>
  );
});

export default Home;
