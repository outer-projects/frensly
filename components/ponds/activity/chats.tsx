import { observer } from "mobx-react";
import ChatItem from "../chats/chatItem";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { ChatStore } from "../../../stores/ChatStore";
import { useEffect } from "react";
const Chats = observer(() => {
  const { getMyChats, myChats } = useInjection(ChatStore);
  useEffect(() => {
    getMyChats();
  }, []);
  return (
    <div className={style.ponds__chat}>
      {myChats?.map((el) => {
        return (
          <ChatItem
            messages={el.room.messages}
            key={el.room.owner._id}
            chatId={el.room._id}
            el={el.room.owner}
            amount={el.ownerShareAmount}
          />
        );
      })}
    </div>
  );
});
export default Chats;
