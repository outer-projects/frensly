import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Ponds from "../../components/ponds/ponds";
import Head from "next/head";

const PondsPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Ponds />
    </div>
  );
});

export default PondsPage;
