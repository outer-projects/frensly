import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Ponds from "../../components/ponds/ponds";
import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";

const PondsPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.explore__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Ponds | Frensly
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
      </Head>
      <Ponds />
    </div>
  );
});

export default PondsPage;
