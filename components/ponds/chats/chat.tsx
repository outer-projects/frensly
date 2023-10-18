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
import { fromWeiToEth, getDate } from "../../../utils/utilities";
import { SocketContext } from "../../../utils/socket";
import { ChatStore } from "../../../stores/ChatStore";
import Link from "next/link";
const Chat = observer(() => {
  const socket = useContext(SocketContext);
  const [newMsg, setNewMsg] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [opacity, setOpacity] = useState(false);
  const [myHolds, setMyHolds] = useState<any>(undefined);
  const messagesEndRef = useRef<any>(null);
  const { getHolders, holders, setCurrentType } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  const { chat, getChat, sendMessage, removeChat } = useInjection(ChatStore);
  const modalStore = useInjection(ModalStore);
  const [isLightning, setIsLightning] = useState(false);
  const [newMsgList, setNewMsgList] = useState<any[]>([]);
  useEffect(() => {
    let tt = setTimeout(() => {
      setOpacity(true);
    }, 1000);
    return () => {
      clearTimeout(tt);
    };
  }, []);
  const startListening = () => {
    if (chat && !isLightning) {
      setIsLightning(true);
      console.log("start listen 2", chat._id);
      socket.emit("join", { room: chat._id });
      socket.on("join", (chat) => {
        console.log(chat, "hi join");
      });
      socket.on("connect_error", (e) => {
        console.log(e, "hi connect_error");
      });
      socket.on("message", (msg) => {
        console.log(msg, "hi message");
        setNewMsgList((oldArray) => [...oldArray, msg]);
      });
    }
  };
  const stopListen = () => {
    console.log("stop listen");
    socket.emit("leave", { room: chat?._id });
    socket.off("join");
    socket.off("leave");
    socket.off("message");
    socket.off("connect_error");
    setMyHolds(undefined);
    setIsLightning(false);
    removeChat();
  };
  useEffect(() => {
    return () => stopListen();
  }, []);

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
      setNewMsgList([]);
      setNewMsgList(chat.messages);
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
    if (user && holders && chat) {
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
        console.log(user);
        setMyHolds({ amount: "1000000", user: user });
      }
    }
  }, [holders, user]);
  return (
    <>
      {myHolds ? (
        <div className={style.openchat}>
          {" "}
          {/* <div className={explore.explore__title}>
            {chat?.owner?.twitterName} pond
          </div> */}
          <div className={style.openchat__info}>
            <div className={style.openchat__user}>
              <div className={style.openchat__user__left}>
                <Link href={"../../ponds"}>
                  <img
                    className={style.openchat__back}
                    src={"../../icons/arrow_back.svg"}
                  />
                </Link>
                <img
                  className={style.openchat__avatar}
                  src={chat?.owner?.avatar}
                />
                <div className={style.openchat__user__left__text}>
                  <div
                    className={style.openchat__user__name}
                    style={{ cursor: "pointer" }}
                  >
                    <Link
                      href={"../../profile/" + chat?.owner.twitterId}
                      style={{ color: "#151614" }}
                    >
                      {chat?.owner?.twitterName}
                    </Link>

                    <a
                      className={style.twitter__redirect}
                      href={"https://twitter.com/" + chat?.owner?.twitterHandle}
                      rel="noreferrer"
                      target="_blank"
                    >
                      @{chat?.owner?.twitterHandle}
                    </a>
                  </div>

                  <div className={style.openchat__status}></div>
                </div>
              </div>
              <div className={style.openchat__user__right}>
                <Link href={"../../activity/" + chat.owner.twitterId}>
                  <button
                    className={classNames(
                      header.connect__button,
                      style.openchat__button__info
                    )}
                  >
                    Info
                  </button>
                </Link>
                <button
                  className={classNames(
                    header.connect__button,
                    style.openchat__button
                  )}
                  onClick={() =>
                    modalStore.showModal(ModalsEnum.Trade, {
                      user: chat?.owner,
                    })
                  }
                >
                  Buy
                </button>
              </div>
            </div>
            <div className={style.openchat__row}>
              <div className={style.openchat__own}>
                <div className={style.openchat__shares}>
                  You own {Number(myHolds?.amount) / 10 ** 6} shares
                </div>
              </div>
              <div className={style.openchat__val}>
                {" "}
                <div className={style.openchat__share__value}>
                  <img src="../../icons/Ethereum.svg" />
                  {chat?.owner?.account.currentPrice &&
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
                  style={{ marginRight: "17px", cursor: "pointer" }}
                  onClick={() => {
                    setCurrentType(0);
                    router.push("../../activity/" + chat?.owner?.twitterId);
                  }}
                >
                  <span>{chat?.owner?.account?.myHolders?.length}</span> Holders
                </div>
                <div
                  className={style.openchat__shares}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCurrentType(1);
                    router.push("../../activity/" + chat?.owner?.twitterId);
                  }}
                >
                  <span>{chat?.owner?.account?.othersShares?.length}</span>{" "}
                  Holding
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
                        el.user.twitterId == user?.twitterId
                          ? style.openchat__my_message__container
                          : style.openchat__message_to_me__container
                      )}
                      key={el._id}
                    >
                      {el.media && (
                        <img src={el.media} className={style.openchat__img} />
                      )}
                      <div className={style.openchat__left}>
                        {el.user.twitterId !== user?.twitterId && (
                          <img
                            className={style.openchat__avatar}
                            src={el.user.avatar}
                          />
                        )}
                        <div
                          className={classNames(
                            el.user.twitterId == user?.twitterId
                              ? style.openchat__msg_container__my
                              : style.openchat__msg_container
                          )}
                        >
                          <div
                            className={classNames(
                              style.openchat__name,
                              el.user.twitterId == user?.twitterId &&
                                style.openchat__mydate
                            )}
                          >
                            {el.user.twitterId !== user?.twitterId && (
                              <div>{el.user.twitterName}</div>
                            )}
                            {el.text == "" && (
                              <div className={style.openchat__time}>
                                {getDate(el.date)}
                              </div>
                            )}
                          </div>
                          {el.text !== "" && (
                            <div
                              className={classNames(
                                el.user.twitterId == user?.twitterId
                                  ? style.openchat__my_message
                                  : style.openchat__message_to_me
                              )}
                              key={el._id}
                            >
                              {el.text}
                              <div className={style.openchat__time}>
                                {getDate(el.date)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
                .reverse()}
              {/* {Array.from({ length: 10 }).map((el, i) => {
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
              })} */}
            </div>
            <Write
              newMsg={newMsg}
              setNewMsg={setNewMsg}
              file={file}
              setFile={setFile}
              onSend={() => {
                sendMessage(id as string, newMsg, file);
                console.log(messagesEndRef);
                setFile(undefined);
                setTimeout(() => {
                  messagesEndRef.current?.scrollTo(500, 0);
                }, 10);
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className={style.openchat__close}
          style={{ opacity: opacity ? 1 : 0 }}
        >
          You are not allowed to enter this chat
        </div>
      )}
    </>
  );
});
export default Chat;
