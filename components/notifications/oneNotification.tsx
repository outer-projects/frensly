import { observer } from "mobx-react";
import { fromWeiToEth, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
import { getActivity } from "./oneActivity";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { useMemo } from "react";
import Link from "next/link";
const OneNotification = observer(({ notification }: { notification: any }) => {
  const { user } = useInjection(Web3Store);
  const isSocial = useMemo(
    () =>
      notification.type == "LIKE" ||
      notification.type == "REPOST" ||
      notification.type == "COMMENT",
    [notification]
  );
  const isMessage = useMemo(
    () => notification.type == "MENTION",
    [notification]
  );
  const isTrade = useMemo(
    () =>
      notification.type == "BUY" ||
      notification.type == "OWN_BUY" ||
      notification.type == "SELL" ||
      notification.type == "OWN_SELL" ||
      notification.type == "INIT" ||
      notification.type == "FOLLOW",
    [notification]
  );
  const linkTo = useMemo(() => {
    if (isSocial) {
      return "/posts/" + notification?.source._id;
    } else if (isTrade) {
      return "/profile/" + notification?.account.profile.twitterId;
    } else if (isMessage) {
      return "/ponds/" + notification?.source._id;
    } else return "";
  }, [isSocial, isTrade, isMessage]);
  return (
    <Link href={linkTo}>
      <div className={style.nots__one}>
        <div className={style.nots__one__users}>
          <img src={notification.account.profile.avatar} />
          <img src={notification.subject.profile.avatar} />
        </div>
        <div>
          <div className={style.nots__one__text}>
            {notification.account.profile.twitterName}{" "}
            {getActivity(notification.type)}{" "}
            {notification.amount && Number(notification.amount) / 10 ** 6}{" "}
            {notification.subject.profile.twitterId !== user?.twitterId &&
              notification.subject.profile.twitterName}
          </div>
          <div className={style.nots__one__info}>
            {notification.price && (
              <div className={style.nots__one__price}>
                {fromWeiToEth(notification.price) + " ETH"}
              </div>
            )}
            <div className={style.nots__one__time}>
              {isSocial
                ? notification?.sourse.text.length >= 10
                  ? notification?.sourse.text.slice(0, 11) + "..."
                  : notification.sourse.text
                : timePassed(notification.date)}{" "}
              ago
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
export default OneNotification;
