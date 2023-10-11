import style from "./profile.module.scss";
import MessageSend from "./messageSend";
import TwitterPost from "./twitterPost";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { FeedStore } from "../../stores/FeedStore";

const TwitterFeed = observer(() => {
  const { feed } = useInjection(FeedStore);
  // useEffect(() => {
  //   getPosts();
  // }, []);
  return (
    <div className={style.twitter__feed}>
      <MessageSend />
      <div>
        {feed?.map((el,i)=>{
          return (
            <TwitterPost key={i} post={el}/>
          )
        })}
      </div>
    </div>
  );
});
export default TwitterFeed;
