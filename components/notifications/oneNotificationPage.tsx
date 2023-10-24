import { observer } from "mobx-react";
import { fromWeiToEth, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
import { getActivity } from "./oneActivity";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { useMemo } from "react";
import Link from "next/link";
const OneNotificationPage = observer(
  ({ notification }: { notification: any }) => {
    const { user } = useInjection(Web3Store);
    const isSocial = useMemo(
      () =>
        notification?.type == "LIKE" ||
        notification?.type == "REPOST" ||
        notification?.type == "COMMENT",
      [notification]
    );
    const message = useMemo(() => {
      if (isSocial) {
        return notification?.source?.text &&
          notification?.source?.text?.length >= 10
          ? notification?.source?.text?.slice(0, 11) + "..."
          : notification?.source?.text;
      } else if (notification.type == "MENTION") {
        let messages = notification?.source?.messages?.filter((el: any) =>
          el.text.includes(user?.twitterId)
        );
        if (messages.length !== 0) {
          return messages[messages.length - 1].text;
        } else {
          return "";
        }
      } else {
        return "";
      }
    }, [isSocial]);
    const isMessage = useMemo(
      () => notification?.type == "MENTION",
      [notification]
    );
    const isTrade = useMemo(
      () =>
        notification?.type == "BUY" ||
        notification?.type == "OWN_BUY" ||
        notification?.type == "SELL" ||
        notification?.type == "OWN_SELL" ||
        notification?.type == "INIT" ||
        notification?.type == "FOLLOW",
      [notification]
    );
    const linkTo = useMemo(() => {
      if (isSocial) {
        return "/posts/" + notification?.source?._id;
      } else if (isTrade) {
        return "/profile/" + notification?.account?.profile?.twitterId;
      } else if (isMessage) {
        return "/ponds/" + notification?.source._id;
      } else return "";
    }, [isSocial, isTrade, isMessage]);
    return (
      <Link href={linkTo}>
        <div className={style.nots__one__page}>
          <div>
            <div className={style.nots__one__users}>
              <img src={notification?.account?.profile?.avatar} />
              {!isSocial && (
                <img src={notification?.subject?.profile?.avatar} />
              )}
            </div>
            <div>
              <div className={style.nots__one__text}>
                {notification?.account?.profile?.twitterName}{" "}
                {getActivity(notification?.type)}{" "}
                {notification?.type == "MENTION" &&
                  notification?.source.owner.twitterHandle + " pond"}
                {notification?.amount && Number(notification?.amount) / 10 ** 6}{" "}
                {notification?.subject?.profile?.twitterId !==
                  user?.twitterId &&
                  notification?.subject?.profile?.twitterName}
              </div>
              <div className={style.nots__one__info}>
                <div className={style.nots__one__time}>
                  {isSocial ? message : timePassed(notification?.date) + " ago"}{" "}
                </div>
              </div>
            </div>
          </div>
          {notification?.price && (
            <div className={style.nots__one__price__page}>
              <img src="../icons/Ethereum.svg" />
              {fromWeiToEth(notification?.price) + " ETH"}
            </div>
          )}
          {notification?.type == "COMMENT" && (
            <img src="../icons/twitterUI/Message.svg" />
          )}
          {notification?.type == "MENTION" && (
            <img src="../icons/twitterUI/Send.svg" />
          )}
          {notification?.type == "REPOST" && (
            <img src="../icons/twitterUI/Swap.svg" />
          )}
          {notification?.type == "LIKE" && (
            <img src="../icons/twitterUI/Heart.svg" />
          )}
          {notification?.type == "FOLLOW" && <img src="../icons/Plus.svg" />}
        </div>
      </Link>
    );
  }
);
export default OneNotificationPage;
