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
import { fromWeiToEth } from "../utils/utilities";
import useDarkMode from "use-dark-mode";

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const BuyModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  const { frensly, address, checkAuth, frenslyNotConnected } = useInjection(Web3Store);
  const [numberOfShares, setNumberOfShares] = useState<number | string>(1);
  const [currentPrice, setCurrentPrice] = useState("0");
  const [priceOfOne, setPriceOfOne] = useState("0");
  const [count, setCount] = useState(0);
  const darkMode = useDarkMode();
  const [isBlocked, setIsBlocked] = useState(false);
  const buy = async () => {
    if (Number(numberOfShares) < 0.000001)
      return toast.error("Amount is too low");
    try {
      // console.log("currentPrice: ", currentPrice);
      const res = await frensly.methods
        .buyShares(
          data.user?.account?.address,
          Number(numberOfShares) * 10 ** 6
        )
        .send({
          from: address,
          value: currentPrice,
        });
      // console.log(res);
      modalStore.hideAllModals();
      checkAuth();
    } catch (e) {
      console.log(e);
    }
  };

  const checkPrice = async (num: number) => {
    // console.log("address: ", data.user?.account?.address, "num: ", num, "num*1kk", Number(num) * 10 ** 6);
    try {
      const res = await frenslyNotConnected.methods
        .getBuyPriceAfterFee(data.user?.account?.address, Number(num) * 10 ** 6)
        .call();
      // console.log("getBuyPriceAfterFee: ", res);
      return res;
    } catch (e) {
      console.log("ERROR getBuyPriceAfterFee: ", e);

      return 0;
    }
  };
  const ownCount = async () => {
    try {
      const res = await frenslyNotConnected.methods
        .sharesBalance(data?.user?.account?.address, address)
        .call();
      // console.log(res);
      setCount(Number(res) / 10 ** 6);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (frensly && data.user) {
      checkAndUpdatePriceOfOne();
      ownCount();
    }
  }, [frensly, data.user]);
  const checkAndUpdatePriceOfOne = () => {
    checkPrice(1).then((res) => {
      setPriceOfOne(res);
    });
  };
  const checkAndUpdateExactPrice = () => {
    checkPrice(numberOfShares !== "" ? Number(numberOfShares) : 0).then(
      (res) => {
        // console.log("currentPrice:", res, numberOfShares);
        setIsBlocked(false)
        setCurrentPrice(res);
      }
    );
  };
  useEffect(() => {
    if (numberOfShares) {
      setIsBlocked(true)
      checkAndUpdateExactPrice();
    }
  }, [numberOfShares]);

  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      <div className={style.buy}>
        <div className={style.buy__info}>
          <div className={style.buy__title}>
            Buy shares
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
          <div className={style.buy__amount}>
            <div className={style.buy__amount__title}>Amount of share</div>
            <input
              className={style.buy__amount__value}
              value={numberOfShares}
              type="text"
              onChange={(e) => {
                if (!isNaN(Number(e.target.value)) || e.target.value == ".") {
                  setNumberOfShares(e.target.value);
                } else if (e.target.value == "") {
                  setNumberOfShares("");
                }
              }}
            />
          </div>
          <div className={style.buy__amount}>
            <div className={style.buy__amount__title}>Total ETH</div>
            <div className={style.buy__amount__value}>
              {fromWeiToEth(currentPrice, 8)} ETH
            </div>
          </div>
        </div>
        <div className={style.buy__buttons}>
          <button
            className={classNames(header.connect__button, style.update__button)}
            onClick={() => {
              checkAndUpdateExactPrice();
              checkAndUpdatePriceOfOne();
            }}
          >
            Update the price
          </button>
          <button
            className={classNames(header.connect__button, style.buy__button)}
            disabled={
              numberOfShares == 0 ||
              numberOfShares == "" ||
              numberOfShares == "."||
              isBlocked
            }
            onClick={buy}
          >
            Buy
          </button>
        </div>
      </div>
    </ModalContainer>
  );
});
