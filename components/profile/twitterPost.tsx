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
import classNames from "classnames";
import Comments from "./comment";

const TwitterPost = observer(
  ({ post, isComment }: { post: IPost; isComment?: boolean }) => {
    const [isActiveLike, setIsActiveLike] = useState(false);
    const [isActiveRepost, setIsActiveRepost] = useState(false);
    const [repostAvailable, setRepostAvailable] = useState(false);
    const { user } = useInjection(Web3Store);
    const { likePost, repostPost, deletePost } = useInjection(FeedStore);
    const [likesCount, setLikesCount] = useState(0);
    const [repostCount, setRepostCount] = useState(0);
    const [openComments, setOpenComments] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
      setLikesCount(post?.likes?.length);
      setRepostCount(post?.reposts?.length);
      setDeleted(post.isDeleted)
      setRepostAvailable(user?.twitterId !== post?.user?.twitterId);
      console.log(
        post.likes.filter((el) => el == user?._id).length,
        "likes: ",
        post.likes,
        "user?._id: ",
        user?._id,
        post.reposts.filter((el) => el == user?._id).length,
        "reposts: ",
        post.reposts,
        "user?._id: ",
        user?._id
      );
      if (post.likes.filter((el) => el == user?._id).length != 0) {
        setIsActiveLike(true);
      } else {
        setIsActiveLike(false);
      }
      if (post.reposts.filter((el) => el == user?._id).length != 0) {
        setIsActiveRepost(true);
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
    const _deletePost = () => {
      deletePost(post._id).then((res) => {
        if (res) {
          setDeleted(true);
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
      <>
        {!deleted ? (
          <div className={style.twitter__post__container}>
            <div
              className={classNames(
                style.twitter__one__post,
                isComment && style.twitter__one__comment
              )}
            >
              <img className={style.twitter__avatar} src={post?.user?.avatar} />
              <div>
                <div className={style.twitter__row}>
                  <div className={style.twitter__name}>
                    {post?.user?.twitterName}
                  </div>
                  <div className={style.twitter__nickname}>
                    @{post?.user?.twitterHandle}
                  </div>
                  <div className={style.twitter__time}>
                    {timePassed(post?.date)}
                  </div>
                </div>
                <div
                  className={classNames(
                    style.twitter__text,
                    isComment && style.twitter__text__comm
                  )}
                >
                  {post?.text}
                </div>
                {post.media && (
                  <img src={post.media} className={style.twitter__image} />
                )}
                <div
                  className={classNames(
                    style.twitter__interact,
                    openComments && style.twitter__interact__open__comment,
                    isComment && style.twitter__interact__comment
                  )}
                >
                  {!isComment && (
                    <div
                      className={style.twitter__icon}
                      onClick={() => setOpenComments(!openComments)}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "4px",
                        }}
                      >
                        <Message />
                      </div>
                      <div>{post?.comments?.length || 0}</div>
                    </div>
                  )}
                  {!isComment && (
                    <div
                      className={style.twitter__icon}
                      onClick={() => {
                        repostAvailable && repost();
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "4px",
                        }}
                      >
                        <Swap isActive={isActiveRepost} />
                      </div>
                      <div>{repostCount}</div>
                    </div>
                  )}

                  <div className={style.twitter__icon} onClick={like}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "4px",
                      }}
                    >
                      <Heart isActive={isActiveLike} />
                    </div>
                    <div>{likesCount}</div>
                  </div>
                </div>
              </div>
              {user?.twitterId == post?.user?.twitterId && (
                <img
                  src="../icons/Close.svg"
                  style={{ width: "20px", height: "20px", cursor:'pointer' }}
                  onClick={() => _deletePost()}
                />
              )}
            </div>
            {!isComment && openComments && (
              <Comments comments={post.comments} originalPost={post._id} />
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
);
export default TwitterPost;
