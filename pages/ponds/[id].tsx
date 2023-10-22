import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Chat from "../../components/ponds/chats/chat";
import Head from "next/head";

const OneChatPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Chat />
    </div>
  );
});

export default OneChatPage;
