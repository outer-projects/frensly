import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Finance from "../../components/finance/finance";
import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";

const FinancePage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.finance__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Finance | Frensly
        </title>
      </Head>
      <Finance />
    </div>
  );
});

export default FinancePage;
