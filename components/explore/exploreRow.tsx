import Link from "next/link";
import { IProfile } from "../../types/users";
import style from "./explore.module.scss";
import { useEffect, useState } from "react";
import { fromWeiToEth, shortNick } from "../../utils/utilities";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/Web3Store";
import EthereumSvg from "../svgs/Ethereum";

const ExploreRow = observer(({ el }: { el: IProfile }) => {
  const [usdPrice, setUsdPrice] = useState(0);
  const { user } = useInjection(Web3Store);
  const { getPriceInUsd, ethCurrency } = useInjection(UserStore);
  useEffect(() => {
    if (el && ethCurrency !== 0) {
      setUsdPrice(getPriceInUsd(el.account.currentPrice));
    }
  }, [el, ethCurrency]);

  return (
    <Link href={"/profile/" + el.twitterId}>
      <div className={style.explore__user}>
        <div className={style.explore__user__left}>
          <img src={el.avatar} />
          <div className={style.explore__user__left__text}>
            <div className={style.explore__user__share}>
              {/* @ts-ignore */}
              {user?.account?.othersShares.filter(
                (u) =>
                  u.subject == el.account._id && Number(u.amount) >= 1000000
              )?.length >= 1 && <img src="../icons/Key.svg" />}
              <div>{Number(el?.account?.sharesAmount) / 10 ** 6} share</div>
            </div>
            <div className={style.explore__user__name}>
              <div>{shortNick(el.twitterName)}</div>
              <span>
                <a
                  href={"https://twitter.com/" + el.twitterHandle}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{el.twitterHandle}
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={style.explore__user__right}>
          <div className={style.explore__user__name}>
            <EthereumSvg/>
            {fromWeiToEth(el.account.currentPrice)} ETH
          </div>
          <div className={style.explore__user__balance__usd}>${usdPrice}</div>
        </div>
      </div>
    </Link>
  );
});
export default ExploreRow;
