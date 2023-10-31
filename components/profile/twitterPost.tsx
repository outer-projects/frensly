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
import Link from "next/link";
import { useRouter } from "next/router";
import { ModalStore } from "../../stores/ModalStore";
import { ModalsEnum } from "../../modals";
//@ts-ignore
import Linkify from "react-linkify";
const TwitterPost = observer(
  ({
    post,
    isComment,
    isRepost,
    isOnePostPage,
    isProfile,
  }: {
    post: IPost;
    isComment?: boolean;
    isRepost?: boolean;
    isOnePostPage?: boolean;
    isProfile?: boolean;
  }) => {
    const [isActiveLike, setIsActiveLike] = useState(false);
    const [isActiveRepost, setIsActiveRepost] = useState(false);
    const [repostAvailable, setRepostAvailable] = useState(false);
    const router = useRouter();
    const modalStore = useInjection(ModalStore);
    const { user } = useInjection(Web3Store);
    const { likePost, repostPost, deletePost } = useInjection(FeedStore);
    const [likesCount, setLikesCount] = useState(0);
    const [repostCount, setRepostCount] = useState(0);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
      setLikesCount(post?.likes?.length);
      setRepostCount(post?.reposts?.length);
      setDeleted(post.isDeleted);
      setRepostAvailable(user?.twitterId !== post?.user?.twitterId);

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
      if (isActiveLike) {
        setIsActiveLike(false);
        setLikesCount(likesCount - 1);
      } else if (!isActiveLike) {
        setIsActiveLike(true);
        setLikesCount(likesCount + 1);
      }
      likePost(post._id, user?._id, isProfile || isComment || isOnePostPage);
    };
    const _deletePost = () => {
      deletePost(post._id).then((res) => {
        if (res) {
          setDeleted(true);
        }
        if (res && isOnePostPage) {
          router.push("../../profile/" + post.user.twitterId);
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
                isOnePostPage && style.twitter__one__post__top
              )}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {isOnePostPage ? (
                  <img
                    src={"../../icons/arrow_back.svg"}
                    style={{ marginRight: "8px" }}
                    onClick={() => {
                      !isComment
                        ? router.back()
                        : router.push("/posts/" + post.originalPost);
                    }}
                  />
                ) : isComment ? (
                  <div style={{ width: "32px" }} />
                ) : (
                  <div style={{ width: "11px" }} />
                )}
                <Link href={"/profile/" + post?.user.twitterId}>
                  <img
                    className={style.twitter__avatar}
                    src={post?.user?.avatar}
                  />
                </Link>
              </div>
              <div>
                <div className={style.twitter__row}>
                  <Link href={"/profile/" + post?.user.twitterId}>
                    <div className={style.twitter__name}>
                      {post?.user?.twitterName}
                    </div>
                  </Link>
                  <a
                    target="_blank"
                    rel="nereferrer"
                    style={{ display: "flex", alignItems: "center" }}
                    href={"https://twitter.com/" + post?.user?.twitterHandle}
                  >
                    <div className={style.twitter__nickname}>
                      @{post?.user?.twitterHandle}
                    </div>
                  </a>
                  <div className={style.twitter__time}>
                    {timePassed(post?.date)}
                  </div>
                </div>
                <Linkify properties={{ target: "_blank" }}>
                  <div
                    className={classNames(
                      style.twitter__text
                      // isComment && style.twitter__text__comm
                    )}
                  >
                    {post?.text}
                  </div>
                </Linkify>
                {post.media && (
                  <img
                    src={post.media}
                    onClick={() =>
                      modalStore.showModal(ModalsEnum.Image, {
                        image: post.media,
                      })
                    }
                    className={classNames(
                      style.twitter__image
                      // isComment && style.twitter__image__com
                    )}
                  />
                )}
                <div
                  className={classNames(
                    style.twitter__interact,
                    isComment && style.twitter__interact__comment
                  )}
                >
                  {
                    <Link href={`/posts/${post._id}`}>
                      <div className={style.twitter__icon}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "4px",
                          }}
                        >
                          <Message />
                        </div>
                        <div>{post?.comments?.length || 0}</div>
                      </div>
                    </Link>
                  }

                  <div
                    className={style.twitter__icon}
                    onClick={() => {
                      !isActiveRepost && repostAvailable && repost();
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "4px",
                      }}
                    >
                      <Swap isActive={isActiveRepost} />
                    </div>
                    <div>{repostCount}</div>
                  </div>

                  <div className={style.twitter__icon} onClick={like}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "4px",
                      }}
                    >
                      <Heart color={isActiveLike ? "#DC0000" : "#B4B4B3"} />
                    </div>
                    <div>{likesCount}</div>
                  </div>
                </div>
              </div>
              {!isRepost && user?.twitterId == post?.user?.twitterId ? (
                <img
                  src="../icons/Close.svg"
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  onClick={() => _deletePost()}
                />
              ) : (
                <div style={{ width: "20px", height: "20px" }} />
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
);
export default TwitterPost;
