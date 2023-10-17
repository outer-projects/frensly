import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = observer((props) => {
  const { push } = useRouter();
  useEffect(()=>{
    push('/explore')
  },[])
  return (
    <div className={style.main__page}>
      <Head>
        <title>Frensly</title>
      </Head>
    </div>
  );
});

export default Home;
