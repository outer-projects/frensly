import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Airdrop from "../../components/finance/airdrop";
import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";

const AirdropPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.finance__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Airdrop | Frensly
        </title>
      </Head>
      <Airdrop />
    </div>
  );
});

export default AirdropPage;
