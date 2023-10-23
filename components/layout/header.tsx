import ConnectButtonCustom from "./connectButtonCustom";
import { observer } from "mobx-react";
import style from "./header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Bell from "../svgs/bell";
import Notifications from "../notifications/notifications";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";
import { SocketContext } from "../../utils/socket";

const Header = observer(() => {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [active, setActive] = useState("");
  const [menuMob, setMenuMob] = useState(false);
  const [nots, setNots] = useState(false);
  const [notsMob, setNotsMob] = useState(false);
  const { user, checkAuth } = useInjection(Web3Store);
  const { getEthCurrency, getAllNotifications, getUnreadCount, unreadCount } =
    useInjection(UserStore);

  const headerText = [
    { name: "Ponds", link: "/ponds" },
    { name: "Feed", link: "/feed" },
    { name: "Profile", link: "/profile" },
    { name: "Explore", link: "/explore" },
    { name: "Finance", link: "/finance" },
  ];

  useEffect(() => {
    getEthCurrency();
    socket.emit("login", (res: any) => {
      console.log(res);
    });
    socket.on("notification", (not: any) => {
      console.log("notification: ", not);
      getAllNotifications();
      getUnreadCount();
    });
    getAllNotifications();
    getUnreadCount();
    return () => {
      socket.emit("logout");
    };
  }, []);
  useEffect(() => {
    if (router.asPath) {
      // console.log(router.asPath);
      setActive(router.asPath);
      checkAuth();
    }
  }, [router.asPath]);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (nots) {
        // console.log("object");
        setNots(false);
      }
    },
  });
  console.log(unreadCount);
  return (
    <div className={style.header__container}>
      <header className={style.header}>
        <Link href={"../../feed"}>
          <img src="../logo.svg" />
        </Link>
        <div className={style.header__row}>
          {headerText.map((el, i) => {
            // console.log(el.link == "/profile");
            return (
              <Link
                href={
                  "../.." +
                  (el.link == "/profile"
                    ? el.link + "/" + user?.twitterId
                    : el.link)
                }
                style={{ textDecoration: "none", color: "auto" }}
              >
                <div
                  key={i}
                  className={classNames(
                    style.header__el,
                    active.includes(el.name.toLowerCase()) &&
                      style.header__el__active
                  )}
                >
                  {el.name}
                  {el.name == "Staking" && (
                    <div className={style.header__soon}>soon</div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        <div className={style.header__user}>
          <div
            ref={ref}
            onClick={() => {
              setNots(!nots);
            }}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Bell isActive={false} />
              <div className={style.header__count__contain}>
                {unreadCount != 0 && (
                  <div className={style.header__count}>{unreadCount}</div>
                )}
              </div>
            </div>
            {nots && <Notifications />}
          </div>
          <ConnectButtonCustom isHeader />
        </div>
      </header>
      <header className={style.header__mobile}>
        <ConnectButtonCustom isHeader />
        <div className={style.header__user}>
          <div
            onClick={() => {
              setNotsMob(!notsMob);
            }}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Bell isActive={false} />

              {unreadCount != 0 && (
                <div className={style.header__count}>{unreadCount}</div>
              )}
            </div>
            {notsMob && <Notifications setNots={setNotsMob} />}
          </div>
          <img
            src="../icons/Burger.svg"
            style={{ height: "24px", marginLeft: "24px" }}
            onClick={() => {
              setMenuMob(!menuMob);
            }}
          />
          <div
            className={style.header__mobile__menu}
            style={{ display: menuMob ? "flex" : "none" }}
          >
            <img
              className={style.header__mobile__menu__close}
              src="../../icons/Close.svg"
              onClick={() => {
                setMenuMob(false);
              }}
            />
            {headerText.map((el, i) => {
              // console.log(el.link == "/profile");
              return (
                <Link
                  href={
                    "../.." +
                    (el.link == "/profile"
                      ? el.link + "/" + user?.twitterId
                      : el.link)
                  }
                  style={{ textDecoration: "none", color: "auto" }}
                  key={i}
                  onClick={() => {
                    setMenuMob(false);
                  }}
                >
                  <div
                    className={classNames(
                      style.header__mobile__menu__item,
                      active.includes(el.name.toLowerCase()) &&
                        style.header__mobile__menu__active
                    )}
                  >
                    {el.name}
                    {el.name == "Staking" && (
                      <div className={style.header__soon}>soon</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
});
export default Header;
