import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Explore from "../components/explore/explore";
import TwitterFeed from "../components/profile/twitterFeed";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import Notifications from "../components/ponds/activity/notifications";

const NotificationsPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.explore__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Notifications | Frensly
        </title>
      </Head>
      <Notifications />
    </div>
  );
});

export default NotificationsPage;
