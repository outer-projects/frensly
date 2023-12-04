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
import { fromWeiToEth, toBNJS } from "../../utils/utilities";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import ExploreRow from "../explore/presonal/exploreRow";
import FinanceRow from "./financeRow";
import Sidebar from "./sidebar";
import EthereumSvg from "../svgs/Ethereum";

const mobTypes = ["Finance", "Referrals", "Airdrop", "Rankings", "Communities"];
const types = ["Finance", "Holders", "Holdings"];
const Finance = observer(() => {
  const [active, setActive] = useState(0);
  const [activeMob, setActiveMob] = useState(0);
  const [keysReady, setKeysReady] = useState(false);
  const [claimValue, setClaimValue] = useState("0");
  const [claimValueCommunity, setClaimValueCommunity] = useState("0");
  const router = useRouter();
  const { user, frensly,  address, checkAuth, community, frenslyNotConnected, communityNotConnected } =
    useInjection(Web3Store);
  const { shares, holders, getShares, getHolders, portfolioValue, getKeys } =
    useInjection(UserStore);
  const claim = async () => {
    try {
      const res = await frensly.methods.claim().send({
        from: address,
      });
      // console.log(res);
      setClaimValue("0");
    } catch (e) {
      console.log(e);
    }
  };
  const claimCommunity = async () => {
    try {
      const res = await community.methods.claim().send({
        from: address,
      });
      // console.log(res);
      setClaimValueCommunity("0");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (activeMob == 1) {
      router.push("/dashboard/invite");
    }
    if (activeMob == 2) {
      router.push("/dashboard/airdrop");
    }
    if (activeMob == 3) {
      router.push("/dashboard/rankings");
    }
    if (activeMob == 4) {
      router.push("/dashboard/communities");
    }
  }, [activeMob]);
  const getClaim = async () => {
    try {
      const res = await frenslyNotConnected.methods.availableToClaim(address).call();
      // console.log("availableToClaim: ", res);
      setClaimValue(res);
    } catch (e) {
      console.log(e);
    }
  };
  const getClaimCommunity = async () => {
    try {
      const res = await communityNotConnected.methods.availableToClaim(address).call();
      // console.log("availableToClaim: ", res);
      setClaimValueCommunity(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (user && !keysReady) {
      setKeysReady(true);
      getShares(user?._id as string);
      getHolders(user?._id as string);
      getKeys();
    }
  }, [user]);
  useEffect(() => {
    if (frensly && community) {
      getClaim();
      getClaimCommunity()
    }
  }, [frensly, community]);
  useEffect(() => {
    checkAuth();
  }, []);
  // console.log(keys);
  return (
    <div className={style.finance__page}>
      <Sidebar />
      <div className={style.finance__container}>
        {/* <div className={style.finance__titles}>
          <div className={explore.explore__title}>Funds</div>
          <div className={classNames(explore.explore__title, style.mob__link)}>
            <Link href={"/dashboard/invite"}>Referrals</Link>
          </div>
          <div className={classNames(explore.explore__title, style.mob__link)}>
            <Link href={"/dashboard/airdrop"}>Airdrop</Link>
          </div>
        </div> */}
        <div className={style.finance__links}>
          <TypesList
            active={activeMob}
            setActive={setActiveMob}
            types={mobTypes}
          />
        </div>
        <div className={style.finance}>
          <User stage="finance" />

          <div className={style.finance__list__desctop}>
            <TypesList active={active} setActive={setActive} types={types} />
          </div>

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
                      toBNJS(user?.account?.subjectFeeClaimed as string).plus(
                        user?.account.holderFeeClaimed as string
                      )
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
                    price={toBNJS(user?.account.currentPrice as string)
                      .multipliedBy((Number(el.amount) / 10 ** 6).toFixed(2))
                      .toFixed(0)}
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
                    price={toBNJS(el.subject.currentPrice as string)
                      .multipliedBy((Number(el.amount) / 10 ** 6).toFixed(2))
                      .toFixed(0)}
                  />
                );
              })}
            </div>
          )}
          
          <div className={style.finance__title__second}>
            Personal claim
          </div>
          <div
            className={classNames(style.finance__subtitle, style.finance__fees)}
          >
            Claim your fees from personal shares{" "}
          </div>
          <div className={style.finance__row}>
            <div className={style.finance__claim__value}>
              <EthereumSvg />
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
          <div className={style.finance__title__second}>
            Community claim
          </div>
          <div
            className={classNames(style.finance__subtitle, style.finance__fees)}
          >
            Claim your fees from community shares{" "}
          </div>
          <div className={style.finance__row}>
            <div className={style.finance__claim__value}>
              <EthereumSvg />
              {fromWeiToEth(claimValue, 8)} ETH
            </div>
            <button
              className={classNames(
                header.connect__button,
                style.finance__claim__button
              )}
              onClick={claimCommunity}
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
