import style from "../ponds.module.scss";
import explore from "../../explore/explore.module.scss";
import header from "../../layout/header.module.scss";
import classNames from "classnames";
import { ElementType, useContext, useEffect, useRef, useState } from "react";
import Write from "./write";
import { observer } from "mobx-react";
import { ModalStore } from "../../../stores/ModalStore";
import { useInjection } from "inversify-react";
import { ModalsEnum } from "../../../modals";
import { useRouter } from "next/router";
import { UserStore } from "../../../stores/UserStore";
import Web3Store from "../../../stores/Web3Store";
import { fromWeiToEth } from "../../../utils/utilities";
import { SocketContext } from "../../../utils/socket";
import { ChatStore } from "../../../stores/ChatStore";
const Chat = observer(() => {
  const socket = useContext(SocketContext);
  const [newMsg, setNewMsg] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const [myHolds, setMyHolds] = useState<any>(undefined);
  const messagesEndRef = useRef<any>(null);
  const { getHolders, holders } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  const { chat, getChat, sendMessage, removeChat } = useInjection(ChatStore);
  const modalStore = useInjection(ModalStore);
  const [isLightning, setIsLightning] = useState(false)
  const [newMsgList, setNewMsgList] = useState<string[]>([]);
  const startListening = () => {
    if (chat && isLightning) {
      setIsLightning(true)
      console.log("start listen 2", chat._id);
      socket.emit("join", { room: chat._id });
      socket.on("join", (chat) => {
        console.log(chat, "hi join");
      });
      socket.on("connect_error", (e) => {
        console.log(e, "hi connect_error");
      });
      socket.on("message", (chat) => {
        console.log(chat, "hi message");
      });
    }
  };
  const stopListen = () => {
    console.log("stop listen");
    socket.emit("leave", { room: chat._id });
    socket.off("join");
    socket.off("leave");
    setMyHolds(undefined);
    removeChat();
  };
  useEffect(() => {
    return () => stopListen();
  }, []);
  function isEven(n: number) {
    n = Number(n);
    return n === 0 || !!(n && !(n % 2));
  }
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      console.log("id is: ", id);
      getChat(id as string);
    }
  }, [id]);
  useEffect(() => {
    if (chat) {
      console.log("id is: ", chat.owner);
      getHolders(chat.owner._id as string);
    }
  }, [chat]);
  useEffect(() => {
    if (myHolds) {
      console.log("start listen");
      startListening();
    }
  }, [myHolds]);
  useEffect(() => {
    console.log(
      "user, holders: ",
      user,
      holders,
      user && holders && holders?.length !== 0
    );
    if (user && holders && holders.length !== 0) {
      console.log(
        "is everything ok?",
        holders.filter((el) => el.user._id == user?.account._id)[0]
      );
      let myholding = holders.filter(
        (el) => el.user._id == user?.account._id && Number(el.amount) >= 1000000
      )[0];
      if (myholding) {
        setMyHolds(myholding);
      }
      if (user._id == chat?.owner._id) {
        setMyHolds({ amount: "1000000", user: user });
      }
    }
  }, [holders, user]);
  return (
    <>
      {myHolds ? (
        <div className={style.openchat}>
          {" "}
          <div className={explore.explore__title}>
            {chat.owner?.twitterName} pond
          </div>
          <div className={style.openchat__info}>
            <div className={style.openchat__user}>
              <div className={style.openchat__user__left}>
                <img
                  className={style.openchat__avatar}
                  src={chat.owner?.avatar}
                />
                <div className={style.openchat__user__left__text}>
                  <div className={style.openchat__user__name}>
                    {chat.owner?.twitterName}
                  </div>
                  <div className={style.openchat__status}>Online</div>
                </div>
              </div>
              <div className={style.openchat__user__right}>
                <button
                  className={classNames(
                    header.connect__button,
                    style.openchat__button
                  )}
                  onClick={() =>
                    modalStore.showModal(ModalsEnum.Trade, { user: chat.owner })
                  }
                >
                  Buy
                </button>
              </div>
            </div>
            <div className={style.openchat__row}>
              <div className={style.openchat__shares}>
                You own {Number(myHolds?.amount) / 10 ** 6} shares
              </div>
              <div className={style.openchat__val}>
                {" "}
                <div className={style.openchat__share__value}>
                  <img src="../../icons/Ethereum.svg" />
                  {chat.owner?.account.currentPrice &&
                    fromWeiToEth(chat.owner?.account.currentPrice)}{" "}
                  ETH
                </div>
                <div className={style.openchat__shares}> per 1 share</div>
              </div>
            </div>
            <div className={style.openchat__row}>
              <div className={style.openchat__holders}>
                <div
                  className={style.openchat__shares}
                  style={{ marginRight: "17px" }}
                >
                  <span>{chat.owner?.account.myHolders.length}</span> Holders
                </div>
                <div className={style.openchat__shares}>
                  <span>{chat.owner?.account.othersShares.length}</span> Holding
                </div>
              </div>
              <div className={style.openchat__shares}>
                <span>TVH</span> $??
              </div>
            </div>
            <div className={style.openchat__messages} ref={messagesEndRef}>
              {newMsgList
                .map((el, i) => {
                  return (
                    <div
                      className={classNames(
                        isEven(i)
                          ? style.openchat__my_message
                          : style.openchat__message_to_me
                      )}
                    >
                      {el}
                      <div className={style.openchat__time}>10:12</div>
                    </div>
                  );
                })
                .reverse()}
              {Array.from({ length: 10 }).map((el, i) => {
                return (
                  <div
                    className={classNames(
                      isEven(i)
                        ? style.openchat__my_message
                        : style.openchat__message_to_me
                    )}
                  >
                    <div>Message from 123 123</div>
                    <div className={style.openchat__time}>10:12</div>
                  </div>
                );
              })}
            </div>
            <Write
              newMsg={newMsg}
              setNewMsg={setNewMsg}
              onSend={() => {
                sendMessage(id as string, newMsg, file);
                setTimeout(() => {
                  messagesEndRef.current?.scrollIntoView();
                }, 10);
              }}
            />
          </div>
        </div>
      ) : (
        <div className={style.openchat__close}>
          You are not allowed to enter this chat
        </div>
      )}
    </>
  );
});
export default Chat;
