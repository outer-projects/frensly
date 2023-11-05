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
import ExploreRow from "../explore/exploreRow";
import FinanceRow from "./financeRow";
import Sidebar from "./sidebar";
import EthereumSvg from "../svgs/Ethereum";
import ProfileSvg from "../svgs/profile";
import InviteSvg from "../svgs/invite";
import AirdropSvg from "../svgs/airdrop";
import AchivementsSvg from "../svgs/rankings";
import SettingsSvg from "../svgs/settings";
export const links = [
  {
    title: "My funds",
    link: "/dashboard/finance",
    img: <ProfileSvg/>,
    active: true,
  },
  {
    title: "Referrals",
    link: "/dashboard/invite",
    img: <InviteSvg/>,
    active: true,
  },
  {
    title: "Airdrop",
    link: "/dashboard/airdrop",
    img: <AirdropSvg/>,
    active: true,
  },
  {
    title: "Rankings",
    link: "/dashboard/rankings",
    img: <AchivementsSvg/>,
    active: true,
  },
  {
    title: "Settings",
    link: "/dashboard/settings",
    img: <SettingsSvg/>,
    active: false,
  },
];
const mobTypes = ["Referrals", "Airdrop"];
const types = ["Finance", "Holders", "Holdings"];
const Finance = observer(() => {
  const [active, setActive] = useState(0);
  const [keysReady, setKeysReady] = useState(false);
  const [claimValue, setClaimValue] = useState("0");
  const router = useRouter();
  const { user, frensly, address, checkAuth } = useInjection(Web3Store);
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
  useEffect(() => {
    if (active == 3) {
      router.push("/dashboard/invite");
    }
    if (active == 4) {
      router.push("/dashboard/airdrop");
    }
  }, [active]);
  const getClaim = async () => {
    try {
      const res = await frensly.methods.availableToClaim(address).call();
      // console.log("availableToClaim: ", res);
      setClaimValue(res);
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
    if (frensly) {
      getClaim();
    }
  }, [frensly]);
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
        <div className={style.finance}>
          <User stage="finance" />
          <TypesList
            active={active}
            setActive={setActive}
            types={types}
            mobTypes={mobTypes}
          />
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
            Available for claim
          </div>
          <div
            className={classNames(style.finance__subtitle, style.finance__fees)}
          >
            Claim your fees{" "}
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
        </div>
      </div>
    </div>
  );
});
export default Finance;
