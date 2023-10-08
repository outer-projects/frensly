
import style from "./profile.module.scss";
import MessageSend from "./messageSend";
import TwitterPost from "./twitterPost";

const TwitterFeed = () => {
  return (
    <div className={style.twitter__feed}>
        <MessageSend/>
        <div>
            <TwitterPost/>
        </div>
    </div>
  );
};
export default TwitterFeed;
