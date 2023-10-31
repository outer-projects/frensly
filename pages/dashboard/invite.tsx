import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Airdrop from "../../components/finance/airdrop";
import Head from "next/head";
import Invite from "../../components/finance/invite";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";

const InvitePage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.finance__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Invite | Frensly
        </title>
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <Invite />
    </div>
  );
});

export default InvitePage;
