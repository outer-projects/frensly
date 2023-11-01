import { observer } from "mobx-react";
import { fromWeiToEth, shortNick, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
import { getActivity } from "./oneActivity";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { useMemo } from "react";
import Link from "next/link";
import EthereumSvg from "../svgs/Ethereum";
const OneNotificationPage = observer(
  ({ notification }: { notification: any }) => {
    const { user } = useInjection(Web3Store);
    const isSocial = useMemo(
      () =>
        notification?.type == "LIKE" ||
        notification?.type == "REPOST" ||
        notification?.type == "COMMENT" ||
        (notification?.type == "MENTION" &&
          notification?.sourceModel == "post"),
      [notification]
    );

    const isMessage = useMemo(
      () =>
        notification?.type == "MENTION" && notification?.sourceModel !== "post",
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
        <div className={style.nots__one__page__container}>
          <div className={style.nots__one__page}>
            <div className={style.nots__one__user}>
              <div className={style.nots__one__users}>
                <img src={notification?.account?.profile?.avatar} />
                {!isSocial && (
                  <img src={notification?.subject?.profile?.avatar} />
                )}
              </div>
              <div>
                <div className={style.nots__one__text}>
                  {shortNick(notification?.account?.profile?.twitterName)}{" "}
                  {getActivity(
                    notification?.type,
                    notification?.source?.originalPost
                  )}{" "}
                  {notification?.type == "MENTION" &&
                    notification?.sourceModel !== "post" &&
                    "@" + notification?.source.owner.twitterHandle + "'s pond"}
                  {notification?.amount &&
                    Number(notification?.amount) / 10 ** 6}{" "}
                  {notification?.subject?.profile?.twitterId !==
                    user?.twitterId &&
                    shortNick(notification?.subject?.profile?.twitterName)}
                </div>
                <div className={style.nots__one__info}>
                  <div className={style.nots__one__time}>
                    {notification.text
                      ? notification.text.slice(0, 20)
                      : timePassed(notification?.date) + " ago"}{" "}
                  </div>
                </div>
              </div>
            </div>
            {notification?.price && (
              <div className={style.nots__one__price__page}>
                <EthereumSvg />
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
              <img src="../icons/twitterUI/Heart__grey.svg" />
            )}
            {notification?.type == "FOLLOW" && <img src="../icons/Plus.svg" style={{filter: "invert(0.5)"}} />}
          </div>
          {notification?.price && (
            <div className={style.nots__one__price__page__mobile}>
              <EthereumSvg />
              {fromWeiToEth(notification?.price) + " ETH"}
            </div>
          )}
        </div>
      </Link>
    );
  }
);
export default OneNotificationPage;
