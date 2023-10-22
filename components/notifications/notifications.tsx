import style from "./notifications.module.scss";
import OneNotification from "./oneNotification";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";

const Notifications = observer(
  ({ setNots }: { setNots?: (n: boolean) => void }) => {
    const { activity } = useInjection(UserStore);
    return (
      <div className={style.nots}>
        <div className={style.nots__title}>
          Notifications
          <img
            className={style.nots__close}
            src="../../icons/Close.svg"
            onClick={() => {
              setNots && setNots(false);
            }}
          />
        </div>
        <div className={style.nots__col}>
          {activity.map((el, i) => {
            // console.log(el);
            // if (i <= 4) {
              return <OneNotification key={el._id} activity={el} />;
            // }
          })}
        </div>
      </div>
    );
  }
);
export default Notifications;
