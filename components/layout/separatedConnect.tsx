import { useConnectModal } from "@rainbow-me/rainbowkit";
import style from "./header.module.scss";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
export const SeparatedConnect = observer(
  ({ cssClassProps }: { cssClassProps?: any }) => {
    const { openConnectModal } = useConnectModal();
    const {user} = useInjection(Web3Store)
    return (
      <button
        onClick={openConnectModal}
        type="button"
        className={classNames(
          style.connect__button,
          cssClassProps && cssClassProps,
          user?.account && style.connect__light
        )}
      >
        <img src="../../icons/MetaMask.svg" style={{ marginTop: "0px" }} />
        {user?.account ? "Connect wallet" : "Sign the message"}
      </button>
    );
  }
);
