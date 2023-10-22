import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Profile from "../../components/profile/profile";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";

const ProfilePage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.explore__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Profile | Frensly
        </title>
      </Head>
      <Profile />
    </div>
  );
});

export default ProfilePage;
