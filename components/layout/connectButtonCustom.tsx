import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Web3Store from "../../stores/Web3Store";
import { SeparatedConnect } from "./separatedConnect";
import { useDisconnect, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import style from "./header.module.scss";
const ConnectButtonCustom = observer(() => {
  const { disconnect } = useDisconnect();
  const [_balance, setBalance] = useState(0);
  const { setConnected, setUser, setSigner, disconnected, balance } =
    useInjection(Web3Store);

  useEffect(() => {
    if (balance) {
      setBalance(balance);
    }
  }, [balance]);
  const publicClient = usePublicClient({
    chainId: 97,
  });
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        authenticationStatus,
        mounted,
      }) => {
        const { data: walletClient } = useWalletClient({
          onSuccess(data) {
            console.log("Success", data, walletClient);
            setSigner(data, chain?.unsupported);
          },
        });

        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        // useEffect(()=>{
        //   if(claim!==0) {
        //     setReward(Number(Number(fromWei(claim.toString())).toFixed(2)))
        //   }
        // },[claim])

        useEffect(() => {
          setConnected(connected as boolean);
          if (connected) {
            setUser(account);
          } else {
            disconnected();
          }
        }, [connected]);

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return <SeparatedConnect />;
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={style.connect__button}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="header--wrapper__block">
                  <div
                    className="header--wrapper__balance"
                    onClick={openAccountModal}
                  >
                    <img src="img/header-icons/balance-ico.png" alt="#" />
                    <span>{_balance}</span>
                  </div>
                  <div className="header--wrapper__sound">
                    <img src="img/header-icons/icons-sound.png" alt="" />
                  </div>
                  <div
                    className="header--wrapper__log"
                    onClick={() => disconnect()}
                  >
                    Logout
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
});
export default ConnectButtonCustom;
