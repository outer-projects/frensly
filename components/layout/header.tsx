import ConnectButtonCustom from "./connectButtonCustom";
import { observer } from "mobx-react";
import style from "./header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Bell from "../svgs/bell";
import Notifications from "./notifications";
import { useDetectClickOutside } from "react-detect-click-outside";

const headerText = ["Ponds", "Feed", "Profile", "Explore", "Finance"];

const Header = observer(() => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [nots, setNots] = useState(false);
  useEffect(() => {
    if (router.asPath) {
      console.log(router.asPath);
      setActive(router.asPath);
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
        <img src="../logo.svg" />
        <div className={style.header__row}>
          {headerText.map((el, i) => {
            return (
              <Link
                href={"../../"+el.toLowerCase()}
                style={{ textDecoration: "none", color: "auto" }}
              >
                <div
                  key={i}
                  className={classNames(
                    style.header__el,
                    active.includes(el.toLowerCase()) &&
                      style.header__el__active
                  )}
                >
                  {el}
                  {el == "Staking" && (
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
              setNots(true);
            }}
          >
            <Bell isActive={false} />
            {nots && <Notifications />}
          </div>
          <ConnectButtonCustom />
        </div>
      </header>
    </div>
  );
});
export default Header;
