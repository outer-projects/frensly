import classNames from "classnames";
import style from "./finance.module.scss";
import Link from "next/link";
import explore from "../explore/explore.module.scss";
import header from "../layout/header.module.scss";
import TypesList from "../common/typesList";
import { useState } from "react";
import User from "./user";
import { useRouter } from "next/router";
export const links = [
  {
    title: "My funds",
    link: "/finance",
    img: "../icons/profile.svg",
  },
  {
    title: "Airdrop",
    link: "/finance/airdrop",
    img: "../icons/airdrop.svg",
  },
];

const types = ["Activity", "Holders", "Holdings"];
const Finance = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();
  return (
    <div className={style.finance__page}>
      <div className={style.finance__side}>
        {links.map((el, i) => {
          return (
            <Link href={el.link} style={{ textDecoration: "none" }}>
              <div
                key={i}
                className={classNames(
                  style.finance__link,
                  el.link == router.asPath && style.finance__link__active
                )}
              >
                <img src={el.img} />
                {el.title}
              </div>
            </Link>
          );
        })}
      </div>
      <div className={style.finance__container}>
        <div className={explore.explore__title}>My Funds</div>
        <div className={style.finance}>
          <User />
          <TypesList active={active} setActive={setActive} types={types} />
          <div className={style.finance__stats}>
            <div className={style.finance__stat}>
              <img src="../icons/Ethereum__grey.svg" />
              <div>
                <div className={style.finance__stat__name}>Portfolio value</div>
                <div className={style.finance__stat__value}>15,34 ETH</div>
              </div>
            </div>
            <div className={style.finance__stat}>
              <img src="../icons/Ethereum__grey.svg" />
              <div>
                <div className={style.finance__stat__name}>Fees Earned</div>
                <div className={style.finance__stat__value}>0,34 ETH</div>
              </div>
            </div>
          </div>
          <div className={style.finance__title__second}>
            Available for claim
          </div>
          <div
            className={classNames(style.finance__subtitle, style.finance__fees)}
          >
            Claim your fees{" "}
          </div>
          <div className={style.finance__row}>
            <div className={style.finance__claim__value}>
              <img src="../icons/Ethereum.svg" />
              113.934 ETH
            </div>
            <button
              className={classNames(
                header.connect__button,
                style.finance__claim__button
              )}
            >
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Finance;
