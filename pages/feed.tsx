import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Explore from "../components/explore/explore";
import TwitterFeed from "../components/profile/twitterFeed";

const FeedPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <TwitterFeed />
    </div>
  );
});

export default FeedPage;
