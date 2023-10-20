import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Web3Store from "../../stores/Web3Store";
import { SeparatedConnect } from "./separatedConnect";
import { useDisconnect, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import style from "./header.module.scss";
import { addressSlice } from "../../utils/utilities";
import classNames from "classnames";
const ConnectButtonCustom = observer(({ isHeader }: { isHeader?: boolean }) => {
  const {
    setConnected,
    setSigner,
    disconnected,
    setAddress,
    setUserBalance,
    user,
    auth,
  } = useInjection(Web3Store);

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
            // console.log("Success", data);
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
          // console.log("object");
          if (connected) {
            setAddress(account);
            setUserBalance(account.displayBalance as string);
          } else {
            disconnected();
          }
        }, [connected, account?.address]);
        // useEffect(() => {
        //   if (account?.address ) {
        //     setAddress(walletClient?.transport, account?.address);
        //   }
        // }, [account?.address]);
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
                    className={classNames(
                      style.connect__button,
                      user?.account && style.connect__light
                    )}
                  >
                    {!isHeader && (
                      <img
                        src="../../icons/MetaMask.svg"
                        style={{ marginTop: "0px" }}
                      />
                    )}
                    {isHeader ? "Change Network" : "Sign the message"}
                  </button>
                );
              }

              return (
                <div>
                  {user?.account ? (
                    <div className={style.account} onClick={openAccountModal}>
                      <img src={user?.avatar} alt="#" />
                      <div style={{ marginLeft: "8px" }}>
                        <div className={style.balance}>
                          {account.displayBalance}
                        </div>
                        <div className={style.address}>
                          {addressSlice(account.address)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={auth}
                      type="button"
                      className={classNames(
                        style.connect__button,
                        user?.account && style.connect__light
                      )}
                    >
                      <img
                        src="../../icons/MetaMask.svg"
                        style={{ marginTop: "0px" }}
                      />
                      {"Sign the message"}
                    </button>
                  )}
                  {/* <div
                    className="header--wrapper__log"
                    onClick={() => disconnect()}
                  >
                    Logout
                  </div> */}
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
