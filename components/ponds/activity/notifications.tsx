import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import explore from "../../explore/explore.module.scss";
import OneNotification from "../../notifications/oneNotification";
import OneNotificationPage from "../../notifications/oneNotificationPage";

const Notifications = observer(() => {
  const { getAllNotifications, notificationsAll } = useInjection(UserStore);
  useEffect(() => {
    getAllNotifications();
  }, []);
  return (
    <div style={{marginTop: '32px'}}>
      <div className={explore.explore__title}>{"Notifications"}</div>
      <div className={style.notifications}>
        {notificationsAll?.map((el) => {
          // console.log(el);
          return <OneNotificationPage key={el._id} notification={el} />;
          // return <></>;
        })}
      </div>
    </div>
  );
});
export default Notifications;
