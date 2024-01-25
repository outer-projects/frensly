import { observer } from "mobx-react";
import Heart from "../socials/twitterUI/Heart";
import Message from "../socials/twitterUI/Message";
import Stats from "../socials/twitterUI/Stats";
import Swap from "../socials/twitterUI/Swap";
import Upload from "../socials/twitterUI/Upload";
import ThreeDots from "../socials/twitterUI/threeDots";
import style from "./profile.module.scss";
import { IPost } from "../../types/feed";
import { useEffect, useMemo, useState } from "react";
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
import Highlighter from "react-highlight-words";
//@ts-ignore

import axios from "axios";
import useDarkMode from "use-dark-mode";
export const tagGet = (text: string) => {
  var tagRegex = /(?<=^|\s)@(\w+)/g;
  // console.log(text);
  return (
    text
      .replaceAll(">", "")
      .replaceAll("<", "")
      // .replaceAll("@", "")
      .replace(tagRegex, function (url) {
        return `<span ><a href="/profile/${url.replace(
          "@",
          ""
        )}" style="color: #a6d000!important; cursor: pointer; font-weight: bold">${url}</a></span>`;
      })
      .replaceAll("{", "")
      .replaceAll("}", "")
  );
};
export function linkify(text: string) {
  var urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return (
      `<a style="color: #a6d000; text-decoration: underline" href="` +
      url +
      '" target="_blank">' +
      url +
      "</a>"
    );
  });
}
const TwitterPost = observer(
  ({
    post,
    isComment,
    isRepost,
    isOnePostPage,
    isProfile,
  }: {
    post: any;
    isComment?: boolean;
    isRepost?: boolean;
    isOnePostPage?: boolean;
    isProfile?: boolean;
  }) => {
    const [isActiveLike, setIsActiveLike] = useState(false);
    const [isActiveRepost, setIsActiveRepost] = useState(false);
    const [repostAvailable, setRepostAvailable] = useState(false);
    const router = useRouter();
    const darkMode = useDarkMode();
    const mentions = useMemo(() => {
      const text = post?.text.match(/(?<=^|\s)@(\w+)/g);
      const result = text ? text.map((s: any) => s.replace("@", "")) : [];
      return result;
    }, []);

    const modalStore = useInjection(ModalStore);
    const { user } = useInjection(Web3Store);
    const { likePost, repostPost } = useInjection(FeedStore);
    const [likesCount, setLikesCount] = useState(0);
    // const [handles, setHandles] = useState<string[]>([]);
    const [repostCount, setRepostCount] = useState(0);
    const [mentionsUpdated, setMentionsUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    // const postText = useMemo(() => {
    //   if (handles.length !== 0) {
    //     let text = post.text;
    //     mentions.map((el: any, i: number) => {
    //       text = text.replace(el, handles[i]);
    //     });
    //     mentions.map((el: any, i: number) => "@" + handles[i]);
    //     // console.log(text);

    //     return text;
    //   } else {
    //     return post.text;
    //   }
    // }, [handles, post.text]);

    useEffect(() => {
      setLikesCount(post?.likes?.length);
      setRepostCount(post?.reposts?.length);
      setDeleted(post.isDeleted);
      setRepostAvailable(user?.twitterId !== post?.user?.twitterId);

      if (post.likes.filter((el: any) => el == user?._id).length != 0) {
        setIsActiveLike(true);
      } else {
        setIsActiveLike(false);
      }
      if (post.reposts.filter((el: any) => el == user?._id).length != 0) {
        setIsActiveRepost(true);
      }
    }, []);
    // const getIds = async () => {
    //   const query = new URLSearchParams();
    //   mentions.map((el) => {
    //     query.append("ids", el);
    //   });
    //   try {
    //     const res = await axios.get(
    //       "/api/v1/user/get/byids/?" + query.toString()
    //     );
    //     setHandles(res.data.handles);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    useEffect(() => {
      if (mentions && mentions.length !== 0 && !mentionsUpdated) {
        setMentionsUpdated(true);
        // getIds();
      }
    }, [mentions]);
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
      modalStore.showModal(ModalsEnum.DeletePost, {
        post: post,
        setDeleted: setDeleted,
        isOnePostPage: isOnePostPage,
        postText: post.text,
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
    console.log("post", post);
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
                  <div className={style.twitter__one__post__header}>
                    <img
                      src={"../../icons/arrow_back.svg"}
                      style={{
                        marginRight: "8px",
                        filter: `invert(${darkMode.value ? "1" : "0"})`,
                      }}
                      onClick={() => {
                        !isComment
                          ? router.back()
                          : router.push("/posts/" + post.originalPost);
                      }}
                    />
                    <div className={style.twitter__one__post__title}>Post</div>
                  </div>
                ) : isComment ? (
                  <div style={{ width: "32px" }} />
                ) : (
                  <div style={{ width: "11px" }} />
                )}
                <Link
                  href={
                    post?.user?.twitterId
                      ? "/profile/" + post?.user?.twitterId
                      : "/communities/" + post?.pond?.handle
                  }
                >
                  <img
                    className={style.twitter__avatar}
                    src={
                      post?.user?.avatar
                        ? post?.user?.avatar
                        : post?.pond?.preview
                    }
                  />
                </Link>
              </div>
              <div>
                <div className={style.twitter__row}>
                  <Link
                    href={
                      post?.user?.twitterId
                        ? "/profile/" + post?.user?.twitterId
                        : "/communities/" + post?.pond?.handle
                    }
                  >
                    <div className={style.twitter__name}>
                      {post?.user?.twitterName
                        ? post?.user?.twitterName
                        : post?.pond?.handle}
                    </div>
                  </Link>
                  <a
                    target="_blank"
                    style={{ display: "flex", alignItems: "center" }}
                    href={
                      "https://twitter.com/" +
                      (post?.user?.twitterHandle
                        ? post?.user?.twitterHandle
                        : post?.pond?.twitter)
                    }
                    className={style.twitter__nickname}
                  >
                    @
                    {post?.user?.twitterHandle
                      ? post?.user?.twitterHandle
                      : post?.pond?.twitter}
                  </a>
                  <div className={style.twitter__time}>
                    {timePassed(post?.date)}
                  </div>
                </div>

                <div
                  className={classNames(
                    style.twitter__text
                    // isComment && style.twitter__text__comm
                  )}
                >
                  {/* @ts-ignore */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: linkify(tagGet(post.text)),
                    }}
                  ></div>
                </div>

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
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    filter: `invert(${darkMode.value ? "1" : "0"})`,
                  }}
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
