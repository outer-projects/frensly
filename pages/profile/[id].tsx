import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Profile from "../../components/profile/profile";
import Head from "next/head";

const ProfilePage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Profile />
    </div>
  );
});

export default ProfilePage;
