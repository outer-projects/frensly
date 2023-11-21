import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Explore from "../../components/explore/presonal/explore";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import ExploreList from "../../components/explore/exploreList";
import Community from "../../components/community/community";
import CommunityList from "../../components/explore/community/communityLIst";


const CommunityPage: NextPage = observer((props) => {

  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.explore__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Community | Frensly
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <ExploreList/>
      <CommunityList />
    </div>
  );
});

export default CommunityPage;
