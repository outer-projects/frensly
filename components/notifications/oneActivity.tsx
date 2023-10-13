import { fromWeiToEth, getDate, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
const OneActivity = ({ activity }: { activity: any }) => {
  return (
    <div className={style.activity__one}>
      <div className={style.activity__one__left}>
        <div className={style.activiy__one__users}>
          <img src={activity.account.profile.avatar} />
          <img src={activity.subject.profile.avatar} />
        </div>
        <div>
          <div className={style.nots__one__text}>
            {activity.account.profile.twitterName} bought {Number(activity.amount)/(10 ** 6)}{" "}
            {activity.subject.profile.twitterName}
          </div>
          <div className={style.nots__one__info}>
            <div className={style.activiy__one__time}>
              {timePassed(activity.date)} ago
            </div>
          </div>
        </div>
      </div>
      <div className={style.activiy__one__price}>
        <img src="../icons/Ethereum.svg" />
        {fromWeiToEth(activity.price)} ETH
      </div>
    </div>
  );
};
export default OneActivity;
