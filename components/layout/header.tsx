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
import { ChatStore } from "../../stores/ChatStore";
import useDarkMode from "use-dark-mode";
import Moon from "../svgs/moon";
import Sun from "../svgs/sun";

const Header = observer(() => {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [active, setActive] = useState("");
  // const [menuMob, setMenuMob] = useState(false);
  const darkMode = useDarkMode(false);
  const [nots, setNots] = useState(false);
  const [notsMob, setNotsMob] = useState(false);
  const { user, authSummaryCheck } = useInjection(Web3Store);
  const { getEthCurrency, getUnreadCount, unreadCount, setWrapperBottom } =
    useInjection(UserStore);
  const { getMyChats, unread } = useInjection(ChatStore);
  const headerText = [
    { name: "Feed", link: "/feed" },
    { name: "Explore", link: "/explore/personal" },
    { name: "Ponds", link: "/ponds" },
    { name: "Profile", link: "/profile" },
    { name: "Dashboard", link: "/dashboard/finance" },
  ];

  useEffect(() => {
    getEthCurrency();
    socket.emit("login", (res: any) => {
      // console.log(res);
    });
    socket.on("notification", (not: any) => {
      // console.log("notification: ", not);
      // getAllNotifications();
      getUnreadCount();
    });
    // getAllNotifications();
    getUnreadCount();
    getMyChats();
    return () => {
      socket.emit("logout");
    };
  }, []);
  useEffect(() => {
    if (router.asPath) {
      setActive(router.asPath);
      // checkAuth();
      setWrapperBottom(false);
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

  return (
    // <div className={style.header__placeholder}>
    <div
      className={classNames(
        style.header__container,
        active.includes("/ponds/") ||
          active.includes("/posts/") ||
          (active.includes("/create-post") && style.header__disable)
      )}
    >
      <header className={style.header}>
        <Link href={"../../feed"}>
          <img src={!darkMode.value ? "../logo.svg" : "../logo_white.svg"} />
        </Link>
        <div
          className={classNames(
            style.header__row,
            !authSummaryCheck && style.header__row__closed
          )}
        >
          {headerText.map((el, i) => {
            // console.log(el.link == "/profile");
            if (authSummaryCheck || i <= 1) {
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
                    {el.name == "Ponds" && unread !== 0 && (
                      <div className={style.header__missing}>{unread}</div>
                    )}
                  </div>
                </Link>
              );
            }
          })}
        </div>
        <div className={style.header__user}>
          <div style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                className={classNames(style.theme__btn)}
                onClick={darkMode.toggle}
              >
                {darkMode.value && <Moon />}
                {!darkMode.value && <Sun />}
              </button>
              {authSummaryCheck && (
                <div
                  ref={ref}
                  style={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Bell
                    isActive={false}
                    notsMob={notsMob}
                    setNotsMob={setNotsMob}
                    unreadCount={unreadCount}
                  />
                </div>
              )}
              <div className={style.header__count__contain}>
                {unreadCount != 0 && (
                  <div className={style.header__count}>{unreadCount}</div>
                )}
              </div>
            </div>
            {nots && <Notifications />}
          </div>
          {/* {console.log(router.asPath)} */}
          {!router.asPath.includes("auth") && <ConnectButtonCustom isHeader />}
        </div>
      </header>
      <header className={style.header__mobile}>
        <ConnectButtonCustom isHeader />
        <div className={style.header__user}>
          <div style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                className={classNames(style.theme__btn)}
                onClick={darkMode.toggle}
              >
                {darkMode.value && <Moon />}
                {!darkMode.value && <Sun />}
              </button>
              {authSummaryCheck && (
                <Bell
                  isActive={false}
                  notsMob={notsMob}
                  setNotsMob={setNotsMob}
                  unreadCount={unreadCount}
                />
              )}

              {unreadCount != 0 && (
                <div className={style.header__count}>{unreadCount}</div>
              )}
            </div>
            {notsMob && <Notifications setNots={setNotsMob} />}
          </div>
          {/* <img
            src="../icons/Burger.svg"
            style={{ height: "24px", marginLeft: "24px" }}
            onClick={() => {
              setMenuMob(!menuMob);
            }}
          /> */}
          {/* <div
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
                    {el.name == "Ponds" && unread !== 0 && (
                      <div className={style.header__missing}>{unread}</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div> */}
        </div>
      </header>
    </div>
    // </div>
  );
});
export default Header;
