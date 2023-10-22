import { fromWeiToEth, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
const OneNotification = ({ activity }: { activity: any }) => {
  return (
    <div className={style.nots__one}>
      <div className={style.nots__one__users}>
        <img src={activity.account.profile.avatar} />
        <img src={activity.subject.profile.avatar} />
      </div>
      <div>
        <div className={style.nots__one__text}>
          {activity.account.profile.twitterName} bought{" "}
          {Number(activity.amount) / 10 ** 6}{" "}
          {activity.subject.profile.twitterName}
        </div>
        <div className={style.nots__one__info}>
          <div className={style.nots__one__price}>
            {fromWeiToEth(activity.price)} ETH
          </div>
          <div className={style.nots__one__time}>
            {timePassed(activity.date)} ago
          </div>
        </div>
      </div>
    </div>
  );
};
export default OneNotification;
