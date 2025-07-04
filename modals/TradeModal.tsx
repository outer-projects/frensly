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
import { fromWeiToEth } from "../utils/utilities";
import useDarkMode from "use-dark-mode";

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const TradeModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  const { frensly, address, frenslyNotConnected } = useInjection(Web3Store);
  const [priceOfOne, setPriceOfOne] = useState("0");
  const [count, setCount] = useState(0);
  const sell = async () => {
    modalStore.hideModal(ModalsEnum.Trade);
    modalStore.showModal(ModalsEnum.Sell, { user: data.user });
  };
  const buy = async () => {
    modalStore.hideModal(ModalsEnum.Trade);
    modalStore.showModal(ModalsEnum.Buy, { user: data.user });
  };
  const checkPrice = async (num: number) => {
    try {
      const res = await frenslyNotConnected.methods
        .getBuyPriceAfterFee(data.user?.account?.address, Number(num) * 10 ** 6)
        .call();
      // console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };
  useEffect(() => {
    if (frensly && data.user) {
      checkAndUpdatePriceOfOne();
      ownCount();
    }
  }, [frensly, data.user]);
  const darkMode = useDarkMode();

  const ownCount = async () => {
    try {
      const res = await frenslyNotConnected.methods
        .sharesBalance(
          data?.user?.account?.address || data.user?.address,
          address
        )
        .call();
      // console.log(res);
      setCount(Number(res) / 10 ** 6);
    } catch (e) {
      console.log(e);
    }
  };
  const checkAndUpdatePriceOfOne = () => {
    checkPrice(1).then((res) => {
      console.log(res);
      setPriceOfOne(res);
    });
  };

  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      <div className={style.trade}>
        <div className={style.buy__info}>
          <div className={style.buy__title}>
            Trade shares
            <img
              src="../icons/Close.svg"
              style={{
                cursor: "pointer",
                filter: `invert(${darkMode.value ? "1" : "0"})`,
              }}
              onClick={() => {
                modalStore.hideAllModals();
              }}
            />
          </div>
          <div className={style.buy__user}>
            <div className={style.buy__user__left}>
              <img className={style.buy__avatar} src={data.user?.avatar} />
              <div className={style.buy__user__left__text}>
                <div className={style.buy__user__name}>
                  {data.user?.twitterName}
                </div>
                <div className={style.buy__own}>You own {count} shares</div>
              </div>
            </div>
            <div className={style.buy__user__left__text}>
              <div
                className={style.buy__user__name}
                style={{ textAlign: "right" }}
              >
                {fromWeiToEth(priceOfOne, 8)} ETH
              </div>
              <div className={style.buy__status}>
                Share price <img src="../icons/Info.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className={style.buy__buttons}>
          <button
            className={classNames(header.connect__button, style.buy__button)}
            onClick={buy}
            style={{ marginBottom: "16px" }}
          >
            Buy share
          </button>
          <button
            className={classNames(header.connect__button, style.sell__button)}
            onClick={sell}
          >
            Sell share
          </button>
        </div>
      </div>
    </ModalContainer>
  );
});
