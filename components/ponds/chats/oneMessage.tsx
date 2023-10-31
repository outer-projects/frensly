import classNames from "classnames";
import style from "../ponds.module.scss";
import { observer } from "mobx-react";
import { getDate } from "../../../utils/utilities";
import { useInjection } from "inversify-react";
import Web3Store from "../../../stores/Web3Store";
import { useContext, useEffect, useMemo, useState } from "react";
// @ts-ignore
import Highlighter from "react-highlight-words";
import { SocketContext } from "../../../utils/socket";
import { IProfile } from "../../../types/users";
import { ModalsEnum } from "../../../modals";
import { ModalStore } from "../../../stores/ModalStore";
import Link from "next/link";
const getUserById = (id: string, members: IProfile[]) => {
  let correctUser = members.filter((el) => el.twitterId == id)[0];
  if (correctUser) {
    return correctUser.twitterHandle;
  }
  return "";
};
const OneMessage = observer(({ el, roomId, members }: any) => {
  const { user } = useInjection(Web3Store);
  const modalStore = useInjection(ModalStore);

  const mentions = useMemo(() => {
    const text = el.text.match(/{[\w\s]+}/g);
    const result = text ? text.map((s: any) => s.slice(1, s.length - 1)) : [];
    return result;
  }, [el.text]);
  const message = useMemo(() => {
    let text = el.text;
    mentions.map((el: any) => {
      text = text.replace(el, getUserById(el, members));
    });
    // console.log(text);

    return text;
  }, [mentions]);
  // console.log(message, mentions);
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
        <img
          src={el.media}
          className={style.openchat__img}
          onClick={() =>
            modalStore.showModal(ModalsEnum.Image, {
              image: el.media,
            })
          }
        />
      )}
      <div className={style.openchat__left}>
        {el.user.twitterId !== user?.twitterId && (
          <Link href={"/profile/" + el.user.twitterId}>
            <img className={style.openchat__avatar} src={el.user.avatar} />
          </Link>
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
              el.user.twitterId == user?.twitterId && style.openchat__mydate
            )}
          >
            {el.user.twitterId !== user?.twitterId && (
              <div>{el.user.twitterHandle}</div>
            )}
            {el.text == "" && (
              <div className={style.openchat__time}>{getDate(el.date)}</div>
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
              <Highlighter
                highlightClassName={style.openchat__mention}
                searchWords={mentions.map(
                  (el: any) => "@" + getUserById(el, members)
                )}
                autoEscape={true}
                textToHighlight={message.replace("{", "").replace("}", "")}
              />{" "}
              <div className={style.openchat__time}>{getDate(el.date)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default OneMessage;
