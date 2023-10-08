import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import { BuyModal } from "./BuyModal";

export enum ModalsEnum {
  Buy,
}

const MODAL_REGISTRY = {
  [ModalsEnum.Buy]: BuyModal,
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
