import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import Web3Store from "../../../stores/Web3Store";
import OneNotification from "../../notifications/oneNotification";

const Notifications = observer(() => {
  const { getAllNotifications, notificationsAll } = useInjection(UserStore);
  useEffect(() => {
    getAllNotifications();
  }, []);
  return (
    <div className={style.ponds__chat}>
      {notificationsAll?.map((el) => {
        // console.log(el);
        return <OneNotification key={el.subject._id} notification={el} />;
        // return <></>;
      })}
    </div>
  );
});
export default Notifications;
