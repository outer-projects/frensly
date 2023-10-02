import { useConnectModal } from "@rainbow-me/rainbowkit";
import style from "./header.module.scss";
export const SeparatedConnect = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <button
      onClick={openConnectModal}
      type="button"
      className={style.connect__button}
    >
      Connect wallet
    </button>
  );
};
