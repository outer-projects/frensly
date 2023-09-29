import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import style from "./modal.module.scss";
import team from "../components/team/team.module.scss";
import { useInjection } from "inversify-react";

import classNames from "classnames";

interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const ZoneModal = observer(({ key, data, idx }: modalProps) => {
  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      
    </ModalContainer>
  );
});
