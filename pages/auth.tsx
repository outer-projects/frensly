import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import AuthBanner from "../components/authBanner/authBanner";
import Web3Store from "../stores/Web3Store";

const AuthPage: NextPage = observer((props) => {
  const { push } = useRouter();
  const { authSummaryCheck } = useInjection(Web3Store);
  //   useEffect(() => {
  //     push("/explore");
  //   }, []);
  //   const router = useRouter();
  //   const { code } = router.query;s
  useEffect(() => {
    if (localStorage.getItem("auth") == undefined) {
      //   localStorage.setItem("invite", code as string);
      localStorage.setItem("auth", "true");
    }
    // if(checkAuth)
  }, []);
  useEffect(() => {
    if (authSummaryCheck) {
      push("/explore");
    }
  }, [authSummaryCheck]);
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.main__page}>
      <Head>
        <title>{unreadCount !== 0 ? `(${unreadCount})` : ""}Frensly</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <AuthBanner />
    </div>
  );
});

export default AuthPage;
