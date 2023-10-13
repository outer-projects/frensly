import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Profile from "../../components/profile/profile";
import Head from "next/head";
import PostWithComments from "../../components/profile/postWithComments";
import Ponds from "../../components/ponds/ponds";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
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
