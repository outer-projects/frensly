import style from "./notifications.module.scss";
import { useDetectClickOutside } from "react-detect-click-outside";
import OneNotification from "./oneNotification";

const Notifications = () => {
  return (
    <div className={style.nots}>
      <div className={style.nots__title}>Notifications</div>
      <div className={style.nots__col}>
        {Array.from({ length: 5 }).map((el) => {
          return (
            <OneNotification/>
          );
        })}
      </div>
    </div>
  );
};
export default Notifications;
