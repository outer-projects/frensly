import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Web3Store from "../../stores/Web3Store";
import { SeparatedConnect } from "./separatedConnect";
import { useWalletClient } from "wagmi";
import style from "./header.module.scss";
import { addressSlice } from "../../utils/utilities";
import classNames from "classnames";
import Link from "next/link";
import Twitter from "../socials/twitter";
import { Router, useRouter } from "next/router";
const ConnectButtonCustom = observer(
  ({ isHeader, isAuth }: { isHeader?: boolean; isAuth?: boolean }) => {
    const {
      setConnected,
      setSigner,
      disconnected,
      setAddress,
      setUserBalance,
      user,
      sign,
      setNeedChangeWallet,
      address,
      authSummaryCheck,
    } = useInjection(Web3Store);
    const router = useRouter();
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
            console.log("account:", account);
            // if (
            //   user?.account?.address.toLowerCase() !== account?.address?.toLowerCase()
            // ) {
            //   setNeedChangeWallet(true);
            // } else {
            //   setNeedChangeWallet(false);
            // }
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
                if (!authSummaryCheck && !isAuth) {
                  return (
                    <div
                      onClick={() => {
                        // localStorage.setItem("auth", "true");
                        setTimeout(() => {
                          router.push("/api/v1/auth/twitter");
                        }, 500);
                      }}
                    >
                      <button
                        className={classNames(style.connect__button, style.connect__mob)}
                        style={{ width: "128px", height: "48px" }}
                      >
                        <Twitter color={"black"} />
                        Authorize
                      </button>
                    </div>
                  );
                }
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
                      <div className={style.account}>
                        <Link href={"/profile/" + user.twitterId}>
                          <img src={user?.avatar} />
                        </Link>
                        <div style={{ marginLeft: "8px" }}>
                          <div
                            className={style.balance}
                            onClick={openAccountModal}
                          >
                            {account.displayBalance}
                          </div>
                          <div className={style.address}>
                            <a
                              href={`https://basescan.org/address/${account.address}`}
                              target="_blank"
                            >
                              {addressSlice(account.address)}
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={sign}
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
  }
);
export default ConnectButtonCustom;
