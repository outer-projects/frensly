import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";

const Home: NextPage = observer((props) => {
  const { push } = useRouter();
  useEffect(()=>{
    push('/explore')
  },[])
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.main__page}>
      <Head>
      <title>{unreadCount !== 0 ? `(${unreadCount})` : ""}Frensly</title>
      </Head>
    </div>
  );
});

export default Home;
