import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Explore from "../components/explore/explore";
import TwitterFeed from "../components/profile/twitterFeed";
import Head from "next/head";

const FeedPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <TwitterFeed />
    </div>
  );
});

export default FeedPage;
