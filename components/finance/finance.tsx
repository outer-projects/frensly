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
import ExploreRow from "../explore/exploreRow";
import FinanceRow from "./financeRow";
import Sidebar from "./sidebar";
export const links = [
  {
    title: "My funds",
    link: "/finance",
    img: "../icons/profile.svg",
    active: true,
  },
  {
    title: "Referral system",
    link: "/finance/invite",
    img: "../icons/invite.svg",
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
  const {
    shares,
    holders,
    getShares,
    getHolders,
    portfolioValue,
    getKeys,
    keys,
  } = useInjection(UserStore);
  const claim = async () => {
    try {
      const res = await frensly.methods.claim().send({
        from: address,
      });
      // console.log(res);
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
      // console.log("availableToClaim: ", res);
      setClaimValue(Number(res));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (user) {
      getShares(user?._id as string);
      getHolders(user?._id as string);
      getKeys();
    }
  }, [user]);
  useEffect(() => {
    if (frensly) {
      getClaim();
    }
  }, [frensly]);
  // console.log(keys);
  return (
    <div className={style.finance__page}>
      <Sidebar />
      <div className={style.finance__container}>
        <div className={style.finance__titles}>
          <div className={explore.explore__title}>My funds</div>
          <div className={classNames(explore.explore__title, style.mob__link)}><Link href={"/finance/invite"}>Referral system</Link></div>
          {/* <div className={classNames(explore.explore__title, style.mob__link)}><Link href={"/finance/airdrop"}>Airdrop</Link></div> */}
        </div>
        <div className={style.finance}>
          <User stage="finance"/>
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
                    {portfolioValue && fromWeiToEth(portfolioValue?.toString())}{" "}
                    ETH
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
              {holders?.map((el) => {
                return (
                  <FinanceRow
                    el={el.user}
                    amount={el.amount}
                    price={
                      Number((Number(el.amount) / 10 ** 6).toFixed(2)) *
                      Number(user?.account.currentPrice)
                    }
                  />
                );
              })}
            </div>
          )}
          {active == 2 && (
            <div className={style.finance__stats}>
              {shares?.map((el) => {
                return (
                  <FinanceRow
                    el={el.subject}
                    amount={el.amount}
                    price={
                      Number((Number(el.amount) / 10 ** 6).toFixed(2)) *
                      Number(el.subject.currentPrice)
                    }
                  />
                );
              })}
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
