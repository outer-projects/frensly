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

const types = ["Following", "Frens"];

const FeedPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  const { feedOffset, feed } = useInjection(FeedStore);
  const [firstRun, setFirstRun] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (feedOffset == 30 && feed.length == 0 && !firstRun) {
      setFirstRun(true);
      setActive(1);
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
        <TypesList types={types} active={active} setActive={setActive} />
      </div>
      {active == 0 && <TwitterFeed isFeed isFrens={false} />}
      {active == 1 && <TwitterFeed isFeed isFrens={true} />}
    </div>
  );
});

export default FeedPage;
