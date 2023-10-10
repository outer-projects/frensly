import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Airdrop from "../../components/finance/airdrop";
import Head from "next/head";

const AirdropPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Airdrop />
    </div>
  );
});

export default AirdropPage;
