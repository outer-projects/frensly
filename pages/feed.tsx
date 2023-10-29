import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import TwitterFeed from "../components/profile/twitterFeed";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";
import TypesList from "../components/common/typesList";
import { useState } from "react";

const types = ["Frens", "Following"];

const FeedPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  const [active, setActive] = useState(0);
  return (
    <div className={style.explore__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Feed | Frensly
        </title>
      </Head>
      <div className={style.explore__type}>
        <TypesList types={types} active={active} setActive={setActive} />
      </div>
      {active == 0 && <TwitterFeed isFeed isFrens={true} />}
      {active == 1 && <TwitterFeed isFeed isFrens={false} />}
    </div>
  );
});

export default FeedPage;
