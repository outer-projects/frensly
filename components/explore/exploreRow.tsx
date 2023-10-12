import Link from "next/link";
import { IProfile } from "../../types/users";
import style from "./explore.module.scss";
import { useEffect, useState } from "react";
import { USDEthPair } from "../../utils/utilities";

const ExploreRow = ({ el }: { el: IProfile }) => {
  const [usdPrice, setUsdPrice] = useState(0);
  useEffect(() => {
    if (el) {
      USDEthPair(el.account.currentPrice).then((el) => {
        if (el) setUsdPrice(el);
      });
    }
  }, [el]);
  return (
    <Link href={"/profile/" + el.twitterId}>
      <div className={style.explore__user}>
        <div className={style.explore__user__left}>
          <img src={el.avatar} />
          <div className={style.explore__user__left__text}>
            <div className={style.explore__user__share}>
              <img src="../icons/Key.svg" />
              <div>{Number(el?.account?.sharesAmount) / 10 ** 6} share</div>
            </div>
            <div className={style.explore__user__name}>{el.twitterName}</div>
          </div>
        </div>
        <div className={style.explore__user__right}>
          <div className={style.explore__user__name}>
            <img src="../icons/Ethereum.svg" />
            {el.account.currentPrice} ETH
          </div>
          <div className={style.explore__user__balance__usd}>${usdPrice}</div>
        </div>
      </div>
    </Link>
  );
};
export default ExploreRow;
