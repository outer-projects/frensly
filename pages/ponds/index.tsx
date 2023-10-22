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
      </Head>
      <Ponds />
    </div>
  );
});

export default PondsPage;
