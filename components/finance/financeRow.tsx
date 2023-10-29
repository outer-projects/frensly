import Link from "next/link";
import { IAccount, IProfile } from "../../types/users";
import style from "../explore/explore.module.scss";
import { useEffect, useState } from "react";
import { fromWeiToEth } from "../../utils/utilities";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/Web3Store";
import BigNumber from "bignumber.js";

const FinanceRow = observer(
  ({
    el,
    amount,
    price,
  }: {
    el: IAccount;
    amount?: string;
    price: BigNumber | string;
  }) => {
    const [usdPrice, setUsdPrice] = useState(0);
    const { user } = useInjection(Web3Store);
    const { getPriceInUsd, ethCurrency } = useInjection(UserStore);
    useEffect(() => {
      if (el && ethCurrency !== 0) {
        setUsdPrice(getPriceInUsd(price ? price?.toString() : el.currentPrice));
      }
    }, [el, ethCurrency]);

    return (
      <Link href={"/profile/" + el.profile?.twitterId}>
        <div className={style.explore__user}>
          <div className={style.explore__user__left}>
            <img src={el?.profile?.avatar} />
            <div className={style.explore__user__left__text}>
              <div className={style.explore__user__share}>
                {/* @ts-ignore */}
                {user?.account?.othersShares.filter(
                  (u) => u.subject == el._id && Number(u.amount) >= 1000000
                )?.length >= 1 && <img src="../icons/Key.svg" />}
                <div>
                  {Number(amount ? amount : el?.sharesAmount) / 10 ** 6} share
                </div>
              </div>
              <div className={style.explore__user__name}>
                {el.profile?.twitterName}
              </div>
            </div>
          </div>
          <div className={style.explore__user__right}>
            <div className={style.explore__user__name}>
              <img src="../icons/Ethereum.svg" />
              {fromWeiToEth(price ? price : el.currentPrice)} ETH
            </div>
            <div className={style.explore__user__balance__usd}>${usdPrice}</div>
          </div>
        </div>
      </Link>
    );
  }
);
export default FinanceRow;
