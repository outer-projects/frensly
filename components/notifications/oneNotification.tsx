import { fromWeiToEth, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
const OneNotification = ({ notification }: { notification: any }) => {
  return (
    <div className={style.nots__one}>
      <div className={style.nots__one__users}>
        <img src={notification.account.profile.avatar} />
        <img src={notification.subject.profile.avatar} />
      </div>
      <div>
        <div className={style.nots__one__text}>
          {notification.account.profile.twitterName} bought{" "}
          {Number(notification.amount) / 10 ** 6}{" "}
          {notification.subject.profile.twitterName}
        </div>
        <div className={style.nots__one__info}>
          {notification.price && (
            <div className={style.nots__one__price}>
              {fromWeiToEth(notification.price) + " ETH"}
            </div>
          )}
          <div className={style.nots__one__time}>
            {timePassed(notification.date)} ago
          </div>
        </div>
      </div>
    </div>
  );
};
export default OneNotification;
