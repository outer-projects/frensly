import { observer } from "mobx-react";
import Heart from "../socials/twitterUI/Heart";
import Message from "../socials/twitterUI/Message";
import Stats from "../socials/twitterUI/Stats";
import Swap from "../socials/twitterUI/Swap";
import Upload from "../socials/twitterUI/Upload";
import ThreeDots from "../socials/twitterUI/threeDots";
import style from "./profile.module.scss";
import { IPost } from "../../types/feed";
import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { FeedStore } from "../../stores/FeedStore";
import { timePassed } from "../../utils/utilities";

const TwitterPost = observer(({ post }: { post: IPost }) => {
  const [isActiveLike, setIsActiveLike] = useState(false);
  const [isActiveRepost, setIsActiveRepost] = useState(false);
  const [repostAvailable, setRepostAvailable] = useState(false);
  const { user } = useInjection(Web3Store);
  const { likePost,repostPost } = useInjection(FeedStore);
  const [likesCount, setLikesCount] = useState(0);
  const [repostCount, setRepostCount] = useState(0);
  useEffect(() => {
    setLikesCount(post?.likes?.length);
    setRepostCount(post?.repostCount);
    setRepostAvailable(user?.twitterId !== post?.user?.twitterId);
    if (
      post.likes.filter((el) => el.twitterId == user?.twitterId).length != 0
    ) {
      setIsActiveLike(true);
    } else {
      setIsActiveLike(false);
    }
    if (user?.twitterId !== post?.user?.twitterId && user?.posts.includes(post._id)) {
      setIsActiveRepost(true)
    }
  }, []);
  const like = () => {
    likePost(post._id).then((res) => {
      if (res && isActiveLike) {
        setIsActiveLike(false);
        setLikesCount(likesCount - 1);
      } else if (res && !isActiveLike) {
        setIsActiveLike(true);
        setLikesCount(likesCount + 1);
      }
    });
  };
  const repost = () => {
    repostPost(post._id).then((res) => {
      if (res && isActiveRepost) {
        setIsActiveRepost(false);
        setRepostCount(repostCount - 1);
      } else if (res && !isActiveRepost) {
        setIsActiveRepost(true);
        setRepostCount(repostCount + 1);
      }
    });
  };
  return (
    <div className={style.twitter__one__post}>
      <img className={style.twitter__avatar} src={post?.user?.avatar} />
      <div>
        <div className={style.twitter__row}>
          <div className={style.twitter__name}>{post?.user?.twitterName}</div>
          <div className={style.twitter__nickname}>
            @{post?.user?.twitterHandle}
          </div>
          <div className={style.twitter__time}>{timePassed(post?.date)}</div>
        </div>
        <div className={style.twitter__text}>{post?.text}</div>
        <div className={style.twitter__interact}>
          <div className={style.twitter__icon}>
            <div style={{ width: "24px", height: "24px", marginRight: "4px" }}>
              <Message />
            </div>
            <div>{post?.comments?.length || 0}</div>
          </div>
            <div className={style.twitter__icon}>
              <div
                style={{ width: "24px", height: "24px", marginRight: "4px" }}
                onClick={()=>{repostAvailable && repost()}}
              >
                <Swap isActive={isActiveRepost} />
              </div>
              <div>{repostCount}</div>
            </div>
          
          <div className={style.twitter__icon}>
            <div
              onClick={like}
              style={{ width: "24px", height: "24px", marginRight: "4px" }}
            >
              <Heart isActive={isActiveLike} />
            </div>
            <div>{likesCount}</div>
          </div>
        </div>
      </div>
      <ThreeDots />
    </div>
  );
});
export default TwitterPost;
