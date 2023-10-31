import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import Notifications from "../components/ponds/activity/notifications";

const NotificationsPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.explore__page}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Notifications | Frensly
        </title>
      </Head>
      <Notifications />
    </div>
  );
});

export default NotificationsPage;
