import { observer } from "mobx-react";
import style from "./footer.module.scss";
import header from "./header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { ChatStore } from "../../stores/ChatStore";
import { deviceDetect, deviceType, getUA } from "react-device-detect";

const Footer = observer(() => {
  const router = useRouter();
  const { unread } = useInjection(ChatStore);
  const [active, setActive] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { user, authSummaryCheck } = useInjection(Web3Store);
  const headerText = [
    { name: "Feed", link: "/feed" },
    { name: "Explore", link: "/explore/personal" },
    { name: "Ponds", link: "/ponds" },
    { name: "Dashboard", link: "/dashboard/finance" },
  ];
  useEffect(() => {
    if (router.asPath) {
      // console.log(router.asPath);
      setActive(router.asPath);
    }
    if (
      router.asPath.includes("/ponds/") ||
      router.asPath.includes("/posts/")
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [router.asPath]);
  console.log("deviceType", deviceDetect(getUA), deviceType);
  return (
    <>
      {!disabled && (
        <div className={style.footer__container}>
          <footer className={style.footer__mobile}>
            {headerText.map((el, i) => {
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
                    key={i}
                  >
                    <div
                      className={classNames(
                        style.footer__link,
                        active.includes(el.name.toLowerCase()) &&
                          style.footer__link__active
                      )}
                    >
                      {el.name}
                      {el.name == "Ponds" && unread !== 0 && (
                        <div className={header.header__missing}>{unread}</div>
                      )}
                    </div>
                  </Link>
                );
              }
            })}
            <div>
            {Object.entries(deviceDetect(getUA)).map((el) => {
              console.log(el);
              return <div>{el[0] + ":" + el[1]}</div>;
            })}</div>
          </footer>
        </div>
      )}
    </>
  );
});
export default Footer;
