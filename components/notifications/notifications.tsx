import style from "./notifications.module.scss";
import { useDetectClickOutside } from "react-detect-click-outside";
import OneNotification from "./oneNotification";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";

const Notifications = observer(() => {
  const { activity } = useInjection(UserStore);
  return (
    <div className={style.nots}>
      <div className={style.nots__title}>Notifications</div>
      <div className={style.nots__col}>
        {activity.map((el, i) => {
          console.log(el);
          if (i <= 4) {
            return <OneNotification key={el._id}/>;
          }
        })}
      </div>
    </div>
  );
});
export default Notifications;
