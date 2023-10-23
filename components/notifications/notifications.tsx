import style from "./notifications.module.scss";
import header from "../layout/header.module.scss";
import OneNotification from "./oneNotification";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

const Notifications = observer(
  ({ setNots }: { setNots?: (n: boolean) => void }) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const { getNotifications, getUnreadCount, notifications, setMyActive } =
      useInjection(UserStore);
    useEffect(() => {
      getNotifications().then((res) => {
        if (res) {
          setVisible(true);
        }
      });
      return () => {
        getUnreadCount();
      };
    }, []);
    return (
      <>
        {visible && (
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
              {notifications.map((el, i) => {
                // console.log(el);
                // if (i <= 4) {
                return <OneNotification key={el._id} notification={el} />;
                // }
              })}
              {notifications.length == 0 && (
                <div className={style.nots__mention}>
                  You don't have unwatched notifications yet
                </div>
              )}
            </div>
            <div className={style.nots__buttons}>
              <button
                className={classNames(
                  header.connect__button,
                  style.nots__button
                )}
                onClick={() => {
                  router.push("../../notifications");
                }}
              >
                Show more
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
);
export default Notifications;
