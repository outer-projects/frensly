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
import { toast } from "react-toastify";

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const TradeModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  const { frensly, address, checkAuth } = useInjection(Web3Store);
  const [numberOfShares, setNumberOfShares] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceOfOne, setPriceOfOne] = useState(0);
  const [count, setCount] = useState(0);
  const sell = async () => {
    modalStore.hideModal(ModalsEnum.Trade)
    modalStore.showModal(ModalsEnum.Sell, {user: data.user})
  };
  const buy = async () => {
    modalStore.hideModal(ModalsEnum.Trade)
    modalStore.showModal(ModalsEnum.Buy, {user: data.user})
  };
  const checkPrice = async (num: number) => {
    try {
      const res = await frensly.methods
        .getSellPriceAfterFee(
          data.user?.account?.address,
          Number(num) * 10 ** 6
        )
        .call();
      console.log(res);
      return Number(res);
    } catch (e) {
      console.log(e);
      return 0;
    }
  };
  useEffect(() => {
    if (frensly) {
      checkAndUpdatePriceOfOne();
      ownCount();
    }
  }, [frensly]);
  const ownCount = async () => {
    try {
      const res = await frensly.methods
        .sharesBalance(data?.user?.account?.address, address)
        .call();
      console.log(res);
      setCount(Number(res)/(10 ** 6));
    } catch (e) {
      console.log(e);
    }
  };
  const checkAndUpdatePriceOfOne = () => {
    checkPrice(1).then((res) => {
      setPriceOfOne(res);
    });
  };
  const checkAndUpdateExactPrice = () => {
    checkPrice(numberOfShares !== "" ? Number(numberOfShares) : 0).then(
      (res) => {
        setCurrentPrice(res);
      }
    );
  };
  useEffect(() => {
    if (numberOfShares) {
      checkAndUpdateExactPrice();
    }
  }, [numberOfShares]);

  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      <div className={style.trade}>
        <div className={style.buy__info}>
          <div className={style.buy__title}>
            Sell a keys
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
                <div className={style.buy__status}>You own {count} keys</div>
              </div>
            </div>
            <div className={style.buy__user__left__text}>
              <div
                className={style.buy__user__name}
                style={{ textAlign: "right" }}
              >
                {Number(Number(fromWei(priceOfOne, "ether")).toFixed(8))} ETH
              </div>
              <div className={style.buy__status}>
                Key price <img src="../icons/Info.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className={style.buy__buttons}>
          <button
            className={classNames(header.connect__button, style.buy__button)}
            disabled={numberOfShares == 0 || numberOfShares == ""}
            onClick={buy}
          >
            Buy a key
          </button>
          <button
            className={classNames(header.connect__button, style.sell__button)}
            disabled={numberOfShares == 0 || numberOfShares == ""}
            onClick={sell}
          >
            Sell a key
          </button>
        </div>
      </div>
    </ModalContainer>
  );
});
