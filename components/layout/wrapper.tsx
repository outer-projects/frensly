import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./header";
import { observer } from "mobx-react";
import style from "./wrapper.module.scss";
import { useInjection } from "inversify-react";
import axios, { AxiosRequestConfig } from "axios";
import Web3Store from "../../stores/Web3Store";
import { prefix } from "../../utils/config";
import ConnectButtonCustom from "./connectButtonCustom";
import Head from "next/head";
import Footer from "./footer";
import header from "./header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { UserStore } from "../../stores/UserStore";
import { deviceDetect, deviceType } from "react-device-detect";
import useDarkMode from "use-dark-mode";

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
    getBalance,
  } = useInjection(Web3Store);
  const [check, setCheck] = useState(false);
  const { setWrapperBottom } = useInjection(UserStore);
  const darkMode = useDarkMode()
  useEffect(()=>{
    if(darkMode.value && document) {
      document.querySelector('meta[name="theme_color"]')?.setAttribute('content', '#123456');
      document.querySelector('meta[name="background_color"]')?.setAttribute('content', '#123456');
    } else if(!darkMode.value) {
      document.querySelector('meta[name="theme_color"]')?.setAttribute('content', '#ffffff');
      document.querySelector('meta[name="background_color"]')?.setAttribute('content', '#123456');
    }
  },[darkMode.value])
  const isInit = async () => {
    console.log("address, user",address, user?.account?.address);
    if (address?.toLowerCase() !== user?.account?.address) {
      setNeedChangeWallet(true);
    } else {
      setNeedChangeWallet(false);
    }
    if (user?.account?.isInitialized) {
      setInit(true);
      setTimeout(() => {
        getBalance();
      }, 1000);
    }
  };
  const ready = useMemo(() => init && user?.account, [init, user?.account]);

  const onScroll = (e: any) => {
    if (e?.target?.documentElement) {
      const { scrollTop, scrollHeight, clientHeight } =
        e?.target.documentElement;

      const isWrapperBottom = scrollTop + clientHeight >= scrollHeight;
      // console.log(scrollTop + clientHeight, scrollHeight);
      if (isWrapperBottom) {
        // console.log("Reached bottom");
        setWrapperBottom(true);
      } else {
        setWrapperBottom(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
   
    return () => {
      window.removeEventListener("scroll", onScroll, false);
    };
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (ready) {
      setAuthSummaryCheck(true);
    } else {
      setAuthSummaryCheck(false);
    }
  }, [ready]);
  // useEffect(() => {
  //   if (localStorage.getItem("auth") === "true") {
  //     router.push("/auth");
  //   }
  // }, []);

  useEffect(() => {
    if (web3 && address && user?.account && frensly && !check) {
      setCheck(true);
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
      onScroll={onScroll}
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
