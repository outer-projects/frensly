import { use, useEffect, useMemo } from "react";
import Header from "./header";
import { observer } from "mobx-react";
import style from "./wrapper.module.scss";
import home from "../../pages/home.module.scss";

import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import axios, { AxiosRequestConfig } from "axios";
import Web3Store from "../../stores/Web3Store";
import { toast } from "react-toastify";
import { prefix } from "../../utils/config";
import AuthBanner from "../authBanner/authBanner";
import ConnectButtonCustom from "./connectButtonCustom";
import Head from "next/head";
import Footer from "./footer";
import header from "./header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

const Wrapper = observer(({ children }: any) => {
  const {
    web3,
    frensly,
    address,
    user,
    setUser,
    needToChangeWallet,
    setNeedChangeWallet,

    setAuthSummaryCheck,
    init,
    setInit,
  } = useInjection(Web3Store);
  const isInit = async () => {
    // console.log(address, user?.account?.address);
    if (address?.toLowerCase() !== user?.account?.address) {
      setNeedChangeWallet(true);
    } else {
      setNeedChangeWallet(false);
    }
    if (user?.account?.isInitialized) {
      setInit(true);
    }
  };
  const ready = useMemo(
    () => !needToChangeWallet && init && user?.account,
    [needToChangeWallet, init, user?.account]
  );

  const router = useRouter();
  useEffect(() => {
    if (ready) {
      setAuthSummaryCheck(true);
    } else if (needToChangeWallet) {
      setAuthSummaryCheck(false);
    } else {
      setAuthSummaryCheck(false);
    }
  }, [ready]);
  useEffect(() => {
    if (localStorage.authorization === "true") {
      router.push("/auth");
    }
  }, []);
  console.log(ready);
  useEffect(() => {
    if (web3 && address && user?.account && frensly) {
      isInit();
      // getNotifications();
    }
  }, [web3, address, user]);

  const getUser = async () => {
    try {
      const res: AxiosRequestConfig = await axios.get(prefix + "user", {
        withCredentials: true,
      });
      setUser(res?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div
      className={classNames(style.page__container, ready && style.page__open)}
    >
      <div className={classNames(style.page__bg)}></div>
      {!needToChangeWallet && <Header />}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      {/* {authorizeOpen && (
        <div className={home.main__page}>
          <AuthBanner />
        </div>
      )} */}
      {needToChangeWallet && (
        <div className={style.change__account}>
          Address is not assigned to this account. Change to{" "}
          {user?.account.address}
          <div style={{ display: "none" }}>
            <ConnectButtonCustom />
          </div>
          <button
            className={header.connect__button}
            style={{ marginTop: "20px" }}
            onClick={async () => {
              try {
                const res = await axios.get("/api/v1/auth/logout");
                setTimeout(() => {
                  window.location.reload();
                }, 400);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Disconnect
          </button>
        </div>
      )}

      {!needToChangeWallet && children}
      {!needToChangeWallet && <Footer />}
      {/* <Header /> */}
      {/* {children} */}
    </div>
  );
});
export default Wrapper;
