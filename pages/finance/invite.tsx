import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Airdrop from "../../components/finance/airdrop";
import Head from "next/head";
import Invite from "../../components/finance/invite";

const InvitePage: NextPage = observer((props) => {
  return (
    <div className={style.finance__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Invite />
    </div>
  );
});

export default InvitePage;
