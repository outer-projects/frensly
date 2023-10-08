import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Chat from "../../components/ponds/chats/chat";

const OneChatPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Chat />
    </div>
  );
});

export default OneChatPage;