import { observer } from "mobx-react";
import { fromWeiToEth, shortNick, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
import { getActivity } from "./oneActivity";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { useMemo } from "react";
import Link from "next/link";
const OneNotification = observer(({ notification }: { notification: any }) => {
  const { user } = useInjection(Web3Store);
  const isPond = useMemo(
    () =>
      notification?.type == "POND_CREATION" ||
      notification?.type == "POND_BUY" ||
      notification?.type == "POND_SELL" ||
      notification?.type == "WHITELIST_REQUEST" ||
      notification?.type == "WHITELIST_ACCEPT" ||
      notification?.type == "WHITELIST_REJECT" ||
      notification?.type == "POND_SUCCESS" ||
      notification?.type == "POND_FAIL",
    [notification]
  );
  const isSocial = useMemo(
    () =>
      notification?.type == "LIKE" ||
      notification?.type == "REPOST" ||
      notification?.type == "COMMENT" ||
      (notification?.type == "MENTION" && notification?.sourceModel == "post"),
    [notification]
  );
  const message = useMemo(() => {
    if (isSocial) {
      return notification?.source?.text &&
        notification?.source?.text?.length >= 10
        ? notification?.source?.text?.slice(0, 11) + "..."
        : notification?.source?.text;
    } else {
      return "";
    }
  }, [isSocial]);
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
      notification?.type == "FOLLOW" ||
      notification?.type == "POND_SELL" ||
      notification?.type == "POND_BUY",
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
      <div className={style.nots__one}>
        <div className={style.nots__one__users}>
          <img src={notification?.account?.profile?.avatar} />
          <img src={notification?.subject?.profile?.avatar} />
        </div>
        <div>
          <div className={style.nots__one__text}>
            {shortNick(notification?.account?.profile?.twitterName)}
            {(notification?.type == "POND_SUCCESS" ||
              notification?.type == "POND_FAIL") && (
              <span>
                <Link
                  href={
                    "/communities/" + notification?.pond.handle
                  }
                >
                  {shortNick(notification?.pond.name)}
                </Link>{" "}
              </span>
            )}
            {getActivity(
              notification?.type,
              notification?.source?.originalPost
            )}{" "}
            {notification?.amount && Number(notification?.amount) / 10 ** 6}{" "}
            {notification?.subject?.profile?.twitterId !== user?.twitterId &&
              shortNick(notification?.subject?.profile?.twitterName)}
              {isPond && <div>{notification?.pond?.name}</div>}
          </div>
          <div className={style.nots__one__info}>
            {notification?.price && (
              <div className={style.nots__one__price}>
                {fromWeiToEth(notification?.price) + " ETH"}
              </div>
            )}
            <div className={style.nots__one__time}>
              {isSocial ? message : timePassed(notification?.date) + " ago"}{" "}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
export default OneNotification;
