import Link from "next/link";
import style from "../ponds.module.scss";
import { IAccount, IProfile } from "../../../types/users";
import { fromWeiToEth } from "../../../utils/utilities";
import { observer } from "mobx-react";
import { UserStore } from "../../../stores/UserStore";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";

const ChatItem = observer(
  ({ el, amount }: { el: IAccount; amount?: string }) => {
    const [usdPrice, setUsdPrice] = useState(0);
    const { getPriceInUsd, ethCurrency } = useInjection(UserStore);
    useEffect(() => {
      if (el && ethCurrency !== 0) {
        setUsdPrice(getPriceInUsd(el.currentPrice));
      }
    }, [el, ethCurrency]);
    return (
      // <Link href="/ponds/123">
      <div className={style.chat__item}>
        <div className={style.chat__info}>
          <img className={style.chat__avatar} src={el.profile.avatar} />
          <div>
            <div className={style.chat__share}>
              {el?.othersShares.filter(
                (u) => u.subject == el._id && Number(u.amount) >= 1000000
              )?.length >= 1 && <img src="../icons/Key.svg" />}
              <div>
                {Number(amount ? amount : el.sharesAmount) / 10 ** 6} share
              </div>
            </div>
            <div className={style.chat__name}>{el.profile.twitterName}</div>
            <div className={style.chat__text}>
              Blah Blah: who’s here?<span>7m</span>
            </div>
          </div>
        </div>
        <div>
          <div className={style.chat__value}>
            <img src="../icons/Ethereum.svg" />
            {fromWeiToEth(el.currentPrice)} ETH
          </div>
          <div className={style.chat__dollar}>${usdPrice}</div>
        </div>
      </div>
      // </Link>
    );
  }
);
export default ChatItem;
