import { useConnectModal } from "@rainbow-me/rainbowkit";
import style from "./header.module.scss";
import classNames from "classnames";
export const SeparatedConnect = ({
  cssClassProps,
}: {
  cssClassProps?: any;
}) => {
  const { openConnectModal } = useConnectModal();

  return (
    <button
      onClick={openConnectModal}
      type="button"
      className={classNames(
        style.connect__button,
        cssClassProps && cssClassProps
      )}
    >
      <img src="../../icons/MetaMask.svg"style={{marginTop:'0px'}} />
      Sign the message
    </button>
  );
};
