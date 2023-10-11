import style from "./profile.module.scss";
import MessageSend from "./messageSend";
import TwitterPost from "./twitterPost";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { FeedStore } from "../../stores/FeedStore";

const TwitterFeed = observer(() => {
  const { getPosts } = useInjection(FeedStore);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className={style.twitter__feed}>
      <MessageSend />
      <div>
        <TwitterPost />
      </div>
    </div>
  );
});
export default TwitterFeed;
