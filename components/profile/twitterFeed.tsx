import style from "./profile.module.scss";
import MessageSend from "./messageSend";
import TwitterPost from "./twitterPost";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { FeedStore } from "../../stores/FeedStore";
import Web3Store from "../../stores/Web3Store";

const TwitterFeed = observer(({ id }: { id?: string }) => {
  const { feed, getFeed, getUserPosts, userPosts } = useInjection(FeedStore);
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    if (id) {
      getUserPosts(id);
    } else {
      getFeed();
    }
  }, []);
  return (
    <div className={style.twitter__feed}>
      {(!id || id == user?.twitterId) && <MessageSend id={id} />}
      <div>
        {(id ? userPosts : feed)?.map((el, i) => {
          return <TwitterPost key={i} post={el} />;
        })}
      </div>
      {(id ? userPosts.length == 0 : feed.length == 0) && <div className={style.twitter__empty}>No activity yet</div>}
    </div>
  );
});
export default TwitterFeed;
