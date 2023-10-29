import { use, useEffect } from "react";
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

const Wrapper = observer(({ children }: any) => {
  const { init, setInit, getNotifications } = useInjection(UserStore);
  const {
    web3,
    frensly,
    address,
    user,
    setUser,
    needToChangeWallet,
    setNeedChangeWallet,
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
    <div className={style.page__container}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      {!needToChangeWallet && (!init || !user?.account) && (
        <div className={home.main__page}>
          <AuthBanner />
        </div>
      )}
      {needToChangeWallet && (
        <div className={style.change__account}>
          Address is not assigned to this account. Change to{" "}
          {user?.account.address}
          <div style={{ display: "none" }}>
            <ConnectButtonCustom />
          </div>
        </div>
      )}
      {!needToChangeWallet && init && user?.account && <Header />}
      {/* <Header /> */}
      {!needToChangeWallet && init && user?.account && children}
      {/* {children} */}
    </div>
  );
});
export default Wrapper;
