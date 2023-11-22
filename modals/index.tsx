import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import { BuyModal } from "./BuyModal";
import { SellModal } from "./SellModal";
import { TradeModal } from "./TradeModal";
import { ImageModal } from "./ImageModal";
import { DeletePostModal } from "./DeletePostModal";
import { BuyCommunityModal } from "./BuyCommunityModal";
import { SellCommunityModal } from "./SellCommunityModal";
import { TradeCommunityModal } from "./TradeCommunityModal";

export enum ModalsEnum {
  Buy,
  BuyCommunity,
  Sell,
  SellCommunity,
  Trade,
  TradeCommunity,
  DeletePost,
  Image,
}

const MODAL_REGISTRY = {
  [ModalsEnum.Buy]: BuyModal,
  [ModalsEnum.Sell]: SellModal,
  [ModalsEnum.Trade]: TradeModal,
  [ModalsEnum.Image]: ImageModal,
  [ModalsEnum.DeletePost]: DeletePostModal,
  [ModalsEnum.BuyCommunity]: BuyCommunityModal,
  [ModalsEnum.SellCommunity]: SellCommunityModal,
  [ModalsEnum.TradeCommunity]: TradeCommunityModal,
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
