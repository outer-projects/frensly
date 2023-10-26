import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import style from "./buy.module.scss";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const ImageModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);

  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      <div className={style.image__container}>
        <img className={style.image} src={data.image} />
        <img
          className={style.close}
          src="../icons/Close.svg"
          onClick={modalStore.hideAllModals}
        />
      </div>
    </ModalContainer>
  );
});
