import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import TwitterFeed from "../components/profile/twitterFeed";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import TypesList from "../components/common/typesList";
import { useEffect, useState } from "react";
import { FeedStore } from "../stores/FeedStore";
import Web3Store from "../stores/Web3Store";

const types = ["Following", "Verified", "Public"];

const FeedPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  const { authSummaryCheck } = useInjection(Web3Store);
  const { feedOffset, feed, activeFeed, setActiveFeed } =
    useInjection(FeedStore);
  const [firstRun, setFirstRun] = useState(false);
  useEffect(() => {
    let storageFeed = localStorage.getItem("feed");
    if (storageFeed && Number(storageFeed) !== activeFeed) {
      setActiveFeed(Number(localStorage.getItem("feed")));
    }
  }, []);
  useEffect(() => {
    if (feedOffset == 30 && feed.length == 0 && !firstRun) {
      setFirstRun(true);
      setActiveFeed(1);
      localStorage.setItem("feed", "1");
    }
  }, [feed, feedOffset]);

  return (
    <div className={style.explore__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Feed | Frensly
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <div className={style.feed__type}>
        <TypesList
          types={authSummaryCheck ? types : types.filter((el, i)=> i !== 0)}
          active={activeFeed}
          setActive={setActiveFeed}
        />
      </div>
      {activeFeed == 0 && <TwitterFeed isFeed />}
      {activeFeed == 1 && <TwitterFeed isFeed isFrens />}
      {activeFeed == 2 && <TwitterFeed isFeed isPublic />}
    </div>
  );
});

export default FeedPage;
