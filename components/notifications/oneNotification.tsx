import { observer } from "mobx-react";
import { fromWeiToEth, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
import { getActivity } from "./oneActivity";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
const OneNotification = observer(({ notification }: { notification: any }) => {
  const {user} = useInjection(Web3Store)
  return (
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
          {notification.account.profile.twitterId !== user?.twitterId && notification.subject.profile.twitterName }
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
});
export default OneNotification;
