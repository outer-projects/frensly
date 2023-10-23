import Link from "next/link";
import style from "../ponds.module.scss";
import { IAccount, IProfile } from "../../../types/users";
import { fromWeiToEth } from "../../../utils/utilities";
import { observer } from "mobx-react";
import { UserStore } from "../../../stores/UserStore";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import classNames from "classnames";

const ChatItem = observer(
  ({
    el,
    amount,
    chatId,
    messages,
    unread,
  }: {
    unread: number;
    el: IProfile;
    amount?: string;
    chatId: string;
    messages: any[];
  }) => {
    const [usdPrice, setUsdPrice] = useState(0);
    const { getPriceInUsd, ethCurrency } = useInjection(UserStore);
    useEffect(() => {
      if (el && ethCurrency !== 0) {
        setUsdPrice(getPriceInUsd(el.account.currentPrice));
      }
    }, [el, ethCurrency]);
    return (
      <Link href={"/ponds/" + chatId}>
        <div
          className={classNames(
            style.chat__item,
            unread !== 0 && style.chat__item__active
          )}
        >
          <div className={style.chat__info}>
            <img className={style.chat__avatar} src={el?.avatar} />
            <div>
              <div className={style.chat__share}>
                {<img src="../icons/Key.svg" />}
                <div>
                  {Number(amount ? amount : el?.account?.sharesAmount) /
                    10 ** 6}{" "}
                  shares
                </div>
              </div>
              <div className={style.chat__name}>{el?.twitterName}</div>
              {messages?.length > 0 ? (
                <div className={style.chat__text}>
                  {/* {messages}: who’s here?<span>7m</span> */}
                  {/* @ts-ignore */}
                  <span>{messages[0]?.user?.twitterName + ": "} </span>
                  {messages[0]?.text?.length > 10
                    ? messages[0].text
                        .replace("{", "")
                        .replace("}", "")
                        .slice(0, 10) + "..."
                    : messages[0].text}
                  {unread !== 0 && (
                    <div className={style.chat__unread}>{unread}</div>
                  )}
                </div>
              ) : (
                <div className={style.chat__text}>
                  No messages yet. Be first!
                </div>
              )}
            </div>
          </div>
          <div className={style.chat__price}>
            <div className={style.chat__value}>
              <img src="../icons/Ethereum.svg" />
              {fromWeiToEth(el?.account?.currentPrice)} ETH
            </div>
            <div className={style.chat__dollar}>${usdPrice}</div>
          </div>
        </div>
      </Link>
    );
  }
);
export default ChatItem;
