import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Chat from "../../components/ponds/chats/chat";
import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";

const OneChatPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.chat__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Chat | Frensly
        </title>
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <Chat />
    </div>
  );
});

export default OneChatPage;
