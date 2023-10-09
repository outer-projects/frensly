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

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const BuyModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  const {frensly} = useInjection(Web3Store);
  const [numberOfShares, setNumberOfShares] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceOfOne, setPriceOfOne] = useState(0)
  const checkPrice = async(num:number) =>{
    try {
      const res = await frensly.methods.getBuyPrice(data.user?.account?.address, num).call()
      console.log(res);
      return Number(res)
    } catch (e) {
      console.log(e);
      return 0
    }
  }
  useEffect(()=>{
    if(frensly) {
      checkPrice(1).then((res)=>{
        setPriceOfOne(res)
      })
    }
  },[frensly])
  useEffect(()=>{
    if(numberOfShares) {
      checkPrice(numberOfShares).then((res)=>{
        setCurrentPrice(res)
      })
    }
  },[numberOfShares])
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
                <div className={style.buy__user__name}>{data.user?.twitterName}</div>
                <div className={style.buy__status}>You own 0 keys</div>
              </div>
            </div>
            <div className={style.buy__user__left__text}>
              <div className={style.buy__user__name}>{priceOfOne} ETH</div>
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
                }
              }}
              type="number"
            />
          </div>
          <div className={style.buy__amount}>
            <div className={style.buy__amount__title}>Total ETH</div>
            <div className={style.buy__amount__value}>{currentPrice} ETH</div>
          </div>
        </div>
        <div className={style.buy__buttons}>
          <button
            className={classNames(header.connect__button, style.update__button)}
          >
            Update the price
          </button>
          <button
            className={classNames(header.connect__button, style.buy__button)}
          >
            Buy
          </button>
        </div>
      </div>
    </ModalContainer>
  );
});
