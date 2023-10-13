import classNames from "classnames";
import style from "./finance.module.scss";
import Link from "next/link";
import explore from "../explore/explore.module.scss";
import header from "../layout/header.module.scss";
import TypesList from "../common/typesList";
import { useEffect, useState } from "react";
import User from "./user";
import { useRouter } from "next/router";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { fromWei } from "web3-utils";
import { fromWeiToEth } from "../../utils/utilities";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import MyHold from "./myHold";
export const links = [
  {
    title: "My funds",
    link: "/finance",
    img: "../icons/profile.svg",
    active: true,
  },
  {
    title: "Airdrop (soon)",
    link: "/finance/airdrop",
    img: "../icons/airdrop.svg",
    active: false,
  },
];

const types = ["Activity", "Holders", "Holdings"];
const Finance = observer(() => {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const [claimValue, setClaimValue] = useState(0);
  const { user, frensly, address, checkAuth } = useInjection(Web3Store);
  const { shares, holders, getShares, getHolders } = useInjection(UserStore);
  const claim = async () => {
    try {
      const res = await frensly.methods.claim().send({
        from: address,
      });
      setClaimValue(Number(res));
      checkAuth();
      getClaim();
    } catch (e) {
      console.log(e);
    }
  };
  const getClaim = async () => {
    try {
      const res = await frensly.methods.availableToClaim(address).call();
      console.log(res);
      setClaimValue(Number(res));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (user) {
      getShares(user?._id as string);
      getHolders(user?._id as string);
    }
  }, [user]);
  useEffect(() => {
    if (frensly) {
      getClaim();
    }
  }, [frensly]);
  return (
    <div className={style.finance__page}>
      <div className={style.finance__side}>
        {links.map((el, i) => {
          return (
            <Link
              href={el.active ? el.link : ""}
              style={{ textDecoration: "none" }}
            >
              <div
                key={i}
                style={{ color: !el.active ? "grey" : "" }}
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
        <div className={explore.explore__title}>My funds</div>
        <div className={style.finance}>
          <User />
          <TypesList active={active} setActive={setActive} types={types} />
          {active == 0 && (
            <div className={style.finance__stats}>
              <div className={style.finance__stat}>
                <img src="../icons/Ethereum__grey.svg" />
                <div>
                  <div className={style.finance__stat__name}>
                    Portfolio value
                  </div>
                  <div className={style.finance__stat__value}>
                    {fromWeiToEth(user?.account.totalVolume as string)} ETH
                  </div>
                </div>
              </div>
              <div className={style.finance__stat}>
                <img src="../icons/Ethereum__grey.svg" />
                <div>
                  <div className={style.finance__stat__name}>Fees Earned</div>
                  <div className={style.finance__stat__value}>
                    {fromWeiToEth(
                      Number(user?.account.subjectFeeClaimed) +
                        Number(user?.account.holderFeeClaimed)
                    )}{" "}
                    ETH
                  </div>
                </div>
              </div>
            </div>
          )}
          {active == 1 && (
            <div className={style.finance__stats}>
              <MyHold holds={holders}/>
            </div>
          )}
          {active == 2 && (
            <div className={style.finance__stats}>
              <MyHold holds={shares}/>
            </div>
          )}
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
              {fromWeiToEth(claimValue, 8)} ETH
            </div>
            <button
              className={classNames(
                header.connect__button,
                style.finance__claim__button
              )}
              onClick={claim}
            >
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Finance;
