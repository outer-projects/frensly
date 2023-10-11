import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Finance from "../../components/finance/finance";
import Head from "next/head";

const FinancePage: NextPage = observer((props) => {
  return (
    <div className={style.finance__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Finance />
    </div>
  );
});

export default FinancePage;
