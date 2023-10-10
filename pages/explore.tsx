import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Explore from "../components/explore/explore";
import Head from "next/head";

const ExplorePage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Explore />
    </div>
  );
});

export default ExplorePage;
