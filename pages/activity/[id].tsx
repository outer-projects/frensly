import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Profile from "../../components/profile/profile";
import Head from "next/head";
import UserActivity from "../../components/ponds/userActivity";

const ActivityPage: NextPage = observer((props) => {

  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <UserActivity />
    </div>
  );
});

export default ActivityPage;
