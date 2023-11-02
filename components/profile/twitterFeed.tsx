import style from "./profile.module.scss";
import MessageSend from "./messageSend";
import TwitterPost from "./twitterPost";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { useEffect, useMemo, useState } from "react";
import { FeedStore } from "../../stores/FeedStore";
import Web3Store from "../../stores/Web3Store";
import Swap from "../socials/twitterUI/Swap";
import { InView } from "react-intersection-observer";
import classNames from "classnames";
import useDarkMode from "use-dark-mode";
import Link from "next/link";
import { ModalStore } from "../../stores/ModalStore";
import { ModalsEnum } from "../../modals";
const TwitterFeed = observer(
  ({
    id,
    isProfile,
    isFrens,
    isPublic,
    isFeed,
  }: {
    id?: string;
    isProfile?: boolean;
    isFrens?: boolean;
    isPublic?: boolean;
    isFeed?: boolean;
  }) => {
    const {
      feed,
      getFeed,
      getPublicFeed,
      getUserPosts,
      userPosts,
      setPostOffset,
      clearUserPosts,
      getFrensFeed,
      frensFeed,
      updateFrensFeed,
      updatePublicFeed,
      updateFeed,
      publicFeed,
      updateUserPosts,
      setHideRow,
      hideRow
    } = useInjection(FeedStore);
    const { user } = useInjection(Web3Store);

    const currentFeed = useMemo(() => {
      if (id) {
        return userPosts;
      } else if (isFrens) {
        return frensFeed;
      } else if (isPublic) {
        return publicFeed;
      } else {
        return feed;
      }
    }, [id, isFrens, isPublic, userPosts, frensFeed, feed, publicFeed]);
    const darkMode = useDarkMode();
    const modalStore = useInjection(ModalStore)
    const updatePosts = () => {
      if (isFrens) {
        updateFrensFeed();
      } else if (isPublic) {
        updatePublicFeed();
      } else {
        updateFeed();
      }
    };
    useEffect(() => {
      if (isProfile) {
        getProfilePosts();
      }
    }, [id]);
    const getProfilePosts = () => {
      if (id) {
        getUserPosts(id);
      }
    };
    const getFeedPosts = () => {
      if (isFrens) {
        getFrensFeed();
      } else if (isPublic) {
        getPublicFeed();
      } else {
        getFeed();
      }
    };
    useEffect(() => {
      if (isFeed) {
        getFeedPosts();
      }

      return () => {
        setPostOffset(0);
        clearUserPosts();
      };
    }, []);
    const hide = (id: string) => {
      setHideRow(id);
    };
    return (
      <div className={classNames(style.twitter__feed, id && style.user__feed)}>
        {(!id || id == user?._id) && (user?.verified || !isFrens) && (
          <MessageSend id={id} />
        )}
        <div>
          {currentFeed
            .filter((el) => !hideRow.includes(el._id))
            ?.map((el, i) => {
              if (!el.isRepost && !el.originalPost) {
                //@ts-ignore

                return (
                  <div key={el._id}>
                    {i !== 0 && i % 29 == 0 && (
                      <InView
                        as="div"
                        triggerOnce
                        onChange={(inView, entry) => {
                          if (inView && isFeed) {
                            console.log("inview");
                            updatePosts();
                          } else if (inView && isProfile) {
                            updateUserPosts(id as string);
                          }
                        }}
                      ></InView>
                    )}
                    <TwitterPost post={el} isProfile={isProfile} />
                  </div>
                );
              } else if (el.isRepost) {
                return (
                  <div key={el._id}>
                    {!el.isDeleted && (
                      <>
                        <div className={style.twitter__repost}>
                          <div
                            className={style.twitter__reposted}
                          >
                            <Swap isActive={false} />
                            <span>
                              <Link href={"/profile/" + el.user.twitterHandle}>
                                {el.user.twitterName}
                              </Link>
                            </span>{" "}
                            reposted
                          </div>
                          {user?.twitterId == el.user?.twitterId ? (
                            <img
                              src="../icons/Close.svg"
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                                filter: `invert(${darkMode.value ? "1" : "0"})`,
                              }}
                              onClick={() =>
                               {
                                modalStore.showModal(ModalsEnum.DeletePost, {post: el, isRepost: true})
                               }
                              }
                            />
                          ) : (
                            <div style={{ width: "20px", height: "20px" }} />
                          )}
                        </div>
                        {/* @ts-ignore */}
                        <TwitterPost
                          post={el?.originalPost}
                          isRepost
                          isProfile={isProfile}
                        />
                        {i !== 0 && i % 29 == 0 && (
                          <InView
                            as="div"
                            triggerOnce
                            onChange={(inView, entry) => {
                              if (inView && isFeed) {
                                console.log("inview");
                                updatePosts();
                              } else if (inView && isProfile) {
                                updateUserPosts(id as string);
                              }
                            }}
                          ></InView>
                        )}
                      </>
                    )}
                  </div>
                );
              }
            })}
        </div>
        {currentFeed.length == 0 && (
          <div className={style.twitter__empty}>No activity yet</div>
        )}
      </div>
    );
  }
);
export default TwitterFeed;
