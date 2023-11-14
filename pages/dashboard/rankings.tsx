import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Airdrop from "../../components/finance/airdrop";
import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";
import Rankings from "../../components/finance/rankings";
import AuthPageWrap from "../../components/layout/authPageWrap";

const RankingsPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <AuthPageWrap>
      <div className={style.finance__page}>
        <Head>
          <title>
            {unreadCount !== 0 ? `(${unreadCount})` : ""} Rankings | Frensly
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          ></meta>
        </Head>
        <Rankings />
      </div>
    </AuthPageWrap>
  );
});

export default RankingsPage;
