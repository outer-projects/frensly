import ConnectButtonCustom from "./connectButtonCustom";
import { observer } from "mobx-react";
import style from "./header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Bell from "../svgs/bell";
import Notifications from "../notifications/notifications";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";

const Header = observer(() => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);
  const [nots, setNots] = useState(false);
  const { user, checkAuth } = useInjection(Web3Store);
  const { getEthCurrency } = useInjection(UserStore);

  const headerText = [
    { name: "Ponds", link: "/ponds" },
    { name: "Feed", link: "/feed" },
    { name: "Profile", link: "/profile" },
    { name: "Explore", link: "/explore" },
    { name: "Finance", link: "/finance" },
  ];
  useEffect(() => {
    getEthCurrency();
  }, []);
  useEffect(() => {
    if (router.asPath) {
      console.log(router.asPath);
      setActive(router.asPath);
      checkAuth();
    }
  }, [router.asPath]);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (nots) {
        console.log("object");
        setNots(false);
      }
    },
  });
  return (
    <div className={style.header__container}>
      <header className={style.header}>
        <Link href={"../../feed"}>
          <img src="../logo.svg" />
        </Link>
        <div className={style.header__row}>
          {headerText.map((el, i) => {
            console.log(el.link == "/profile");
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
            <Bell isActive={false} />
            {nots && <Notifications setNots={setNots}/>}
          </div>
          <ConnectButtonCustom />
        </div>
      </header>
      <header className={style.header__mobile}>
        <ConnectButtonCustom />
        <div className={style.header__user}>
          <div
            ref={ref}
            onClick={() => {
              setNots(!nots);
            }}
            style={{ cursor: "pointer" }}
          >
            <Bell isActive={false} />
            {nots && <Notifications setNots={setNots}/>}
          </div>
          <img
            src="../icons/Burger.svg"
            style={{ height: "24px", marginLeft: "24px" }}
            onClick={() => {
              setMenu(!menu);
            }}
          />
          <div
            className={style.header__mobile__menu}
            style={{ display: menu ? "flex" : "none" }}
          >
            <img className={style.header__mobile__menu__close} src="../../icons/Close.svg" onClick={()=>{setMenu(false)}}/>
            {headerText.map((el, i) => {
              console.log(el.link == "/profile");
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
                  onClick={()=>{setMenu(false)}}
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
