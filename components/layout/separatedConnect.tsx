import { useConnectModal } from "@rainbow-me/rainbowkit";

export const SeparatedConnect = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <button
      onClick={openConnectModal}
      type="button"
      className="connect__button"
      style={{ padding: "14px" }}
    >
      Connect
    </button>
  );
};
