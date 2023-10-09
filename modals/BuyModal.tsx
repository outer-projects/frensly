import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import style from "./buy.module.scss";
import header from "../components/layout/header.module.scss";
import { useInjection } from "inversify-react";
import classNames from "classnames";
import { ModalStore } from "../stores/ModalStore";
import { useEffect, useState } from "react";
import Web3Store from "../stores/Web3Store";
import { fromWei } from "web3-utils";

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const BuyModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  const { frensly, address, checkAuth } = useInjection(Web3Store);
  const [numberOfShares, setNumberOfShares] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceOfOne, setPriceOfOne] = useState(0);
  const buy = async() =>{
    try {
      const res = await frensly.methods.buyShares(data.user?.account?.address, numberOfShares).send({
        from: address,
        value: currentPrice,
      })
      console.log(res);
      checkAuth()
    } catch(e) {
      console.log(e);
    }
    
  }
  const checkPrice = async (num: number) => {
    try {
      const res = await frensly.methods
        .getBuyPrice(data.user?.account?.address, num)
        .call();
      console.log(res);
      return Number(res) * 10 ** 6;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };
  useEffect(() => {
    if (frensly) {
      checkPrice(1).then((res) => {
        setPriceOfOne(res);
      });
    }
  }, [frensly]);
  useEffect(() => {
    if (numberOfShares) {
      checkPrice(
        typeof numberOfShares == "number" ? numberOfShares : 0
      ).then((res) => {
        setCurrentPrice(res);
      });
    }
  }, [numberOfShares]);
  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      <div className={style.buy}>
        <div className={style.buy__info}>
          <div className={style.buy__title}>
            Buy a keys
            <img
              src="../icons/Close.svg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                modalStore.hideAllModals();
              }}
            />
          </div>
          <div className={style.buy__user}>
            <div className={style.buy__user__left}>
              <img
                className={style.buy__avatar}
                src="../icons/AvatarBlue.svg"
              />
              <div className={style.buy__user__left__text}>
                <div className={style.buy__user__name}>
                  {data.user?.twitterName}
                </div>
                <div className={style.buy__status}>You own 0 keys</div>
              </div>
            </div>
            <div className={style.buy__user__left__text}>
              <div className={style.buy__user__name}>{fromWei(priceOfOne, "ether")} ETH</div>
              <div className={style.buy__status}>
                Key price <img src="../icons/Info.svg" />
              </div>
            </div>
          </div>
          <div className={style.buy__amount}>
            <div className={style.buy__amount__title}>Amount of share</div>
            <input
              className={style.buy__amount__value}
              value={numberOfShares}
              onChange={(e) => {
                if (Number(e.target.value) >= 0.000001) {
                  setNumberOfShares(Number(e.target.value));
                } else {
                  setNumberOfShares("");
                }
              }}
              type="number"
            />
          </div>
          <div className={style.buy__amount}>
            <div className={style.buy__amount__title}>Total ETH</div>
            <div className={style.buy__amount__value}>{fromWei(currentPrice, "ether")} ETH</div>
          </div>
        </div>
        <div className={style.buy__buttons}>
          {/* <button
            className={classNames(header.connect__button, style.update__button)}
          >
            Update the price
          </button> */}
          <button
            className={classNames(header.connect__button, style.buy__button)}
            disabled={numberOfShares == 0 || numberOfShares == ''}
            onClick={buy}
          >
            Buy
          </button>
        </div>
      </div>
    </ModalContainer>
  );
});
