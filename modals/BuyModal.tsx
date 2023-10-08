import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import style from "./buy.module.scss";
import header from "../components/layout/header.module.scss";
import { useInjection } from "inversify-react";
import classNames from "classnames";
import { ModalStore } from "../stores/ModalStore";

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const BuyModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore)
  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      <div className={style.buy}>
        <div className={style.buy__info}>
          <div className={style.buy__title}>
            Buy a keys
            <img src="../icons/Close.svg" style={{cursor:'pointer'}} onClick={()=>{modalStore.hideAllModals()}}/>
          </div>
          <div className={style.buy__user}>
            <div className={style.buy__user__left}>
              <img
                className={style.buy__avatar}
                src="../icons/AvatarBlue.svg"
              />
              <div className={style.buy__user__left__text}>
                <div className={style.buy__user__name}>UserName</div>
                <div className={style.buy__status}>You own 0 keys</div>
              </div>
            </div>
            <div className={style.buy__user__left__text}>
              <div className={style.buy__user__name}>3.364 ETH</div>
              <div className={style.buy__status}>
                Key price <img src="../icons/Info.svg" />
              </div>
            </div>
          </div>
          <div className={style.buy__amount}>
            <div className={style.buy__amount__title}>Amount of share</div>
            <div className={style.buy__amount__value}>0,23</div>
          </div>
          <div className={style.buy__amount}>
            <div className={style.buy__amount__title}>Total ETH</div>
            <div className={style.buy__amount__value}>0,34 ETH</div>
          </div>
        </div>
        <div className={style.buy__buttons}>
          <button className={classNames(header.connect__button, style.update__button)}>Update the price</button>
          <button className={classNames(header.connect__button, style.buy__button)}>Buy</button>
        </div>
      </div>
    </ModalContainer>
  );
});
