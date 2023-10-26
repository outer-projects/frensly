import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import { BuyModal } from "./BuyModal";
import { SellModal } from "./SellModal";
import { TradeModal } from "./TradeModal";
import { ImageModal } from "./ImageModal";

export enum ModalsEnum {
  Buy,
  Sell,
  Trade,
  Image,
}

const MODAL_REGISTRY = {
  [ModalsEnum.Buy]: BuyModal,
  [ModalsEnum.Sell]: SellModal,
  [ModalsEnum.Trade]: TradeModal,
  [ModalsEnum.Image]: ImageModal,
};

export const ModalsContainer = observer(() => {
  const modalStore = useInjection(ModalStore);

  return (
    <>
      {modalStore.activeModals.map((m, i) => {
        // @ts-ignore
        const Component = MODAL_REGISTRY[m.key];
        return <Component key={i} data={m.data} idx={i} />;
      })}
    </>
  );
});
