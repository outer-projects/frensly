import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import Notifications from "../components/ponds/activity/notifications";
import AuthPageWrap from "../components/layout/authPageWrap";

const NotificationsPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <AuthPageWrap>
      <div className={style.explore__page}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          ></meta>
          <title>
            {unreadCount !== 0 ? `(${unreadCount})` : ""} Notifications |
            Frensly
          </title>
        </Head>
        <Notifications />
      </div>
    </AuthPageWrap>
  );
});

export default NotificationsPage;
