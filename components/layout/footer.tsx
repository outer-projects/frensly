
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

const Footer = observer(() => {
  const router = useRouter();
  const { unread } = useInjection(ChatStore);
  const [active, setActive] = useState("");
  const { user, checkAuth } = useInjection(Web3Store);
  const headerText = [
    { name: "Feed", link: "/feed" },
    { name: "Explore", link: "/explore" },
    { name: "Ponds", link: "/ponds" },
    { name: "Dashboard", link: "/dashboard/finance" },
  ];
  useEffect(() => {
    if (router.asPath) {
      console.log(router.asPath);
      setActive(router.asPath);
      checkAuth();
    }
  }, [router.asPath]);
  return (
    <div className={style.footer__container}>
      <footer className={style.footer__mobile}>
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
        })}
      </footer>
    </div>
  );
});
export default Footer;
