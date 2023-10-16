import style from "../ponds.module.scss";
import explore from "../../explore/explore.module.scss";
import header from "../../layout/header.module.scss";
import classNames from "classnames";
import { ElementType, useEffect, useRef, useState } from "react";
import Write from "./write";
import { observer } from "mobx-react";
import { ModalStore } from "../../../stores/ModalStore";
import { useInjection } from "inversify-react";
import { ModalsEnum } from "../../../modals";
import { useRouter } from "next/router";
import { UserStore } from "../../../stores/UserStore";
import Web3Store from "../../../stores/Web3Store";
import { fromWeiToEth } from "../../../utils/utilities";
const Chat = observer(() => {
  const [newMsg, setNewMsg] = useState("");
  const [myHolds, setMyHolds] = useState<any>(undefined);
  const messagesEndRef = useRef<any>(null);
  const { getProfileUser, profileUser, getHolders, holders } =
    useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  const modalStore = useInjection(ModalStore);

  const [newMsgList, setNewMsgList] = useState<string[]>([]);
  useEffect(() => {}, []);
  function isEven(n: number) {
    n = Number(n);
    return n === 0 || !!(n && !(n % 2));
  }
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      console.log("id is: ", id);
      getProfileUser(id as string);
    }
  }, [id]);
  useEffect(() => {
    if (profileUser) {
      console.log("id is: ", profileUser._id);
      getHolders(profileUser._id as string);
    }
  }, [profileUser]);
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
        (el) => el.user._id == user?.account._id
      )[0];
      setMyHolds(myholding);
    }
  }, [holders, user]);
  return (
    <>
      {!myHolds ? (
        <div className={style.openchat}>
          {" "}
          <div className={explore.explore__title}>
            {profileUser?.twitterName} pond
          </div>
          <div className={style.openchat__info}>
            <div className={style.openchat__user}>
              <div className={style.openchat__user__left}>
                <img
                  className={style.openchat__avatar}
                  src={profileUser?.avatar}
                />
                <div className={style.openchat__user__left__text}>
                  <div className={style.openchat__user__name}>
                    {profileUser?.twitterName}
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
                  onClick={() => modalStore.showModal(ModalsEnum.Trade)}
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
                  {profileUser?.account.currentPrice &&
                    fromWeiToEth(profileUser?.account.currentPrice)}{" "}
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
                  <span>{profileUser?.account.myHolders.length}</span> Holders
                </div>
                <div className={style.openchat__shares}>
                  <span>{profileUser?.account.othersShares.length}</span>{" "}
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
                setNewMsgList([...newMsgList, newMsg]);
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
