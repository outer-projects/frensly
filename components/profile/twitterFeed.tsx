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
const TwitterFeed = observer(
  ({
    id,
    isProfile,
    isFrens,
  }: {
    id?: string;
    isProfile?: boolean;
    isFrens?: boolean;
  }) => {
    const {
      feed,
      getFeed,
      getUserPosts,
      userPosts,
      deletePost,
      setPostOffset,
      clearUserPosts,
      getFrensFeed,
      frensFeed,
    } = useInjection(FeedStore);
    const { user } = useInjection(Web3Store);
    const [hideRow, setHideRow] = useState<string[]>([]);
    const currentFeed = useMemo(() => {
      if (id) {
        return userPosts;
      } else if (isFrens) {
        return frensFeed;
      } else {
        return feed;
      }
    }, [id, isFrens, userPosts, frensFeed, feed]);
    const updatePosts = () => {
      if (id) {
        getUserPosts(id);
      } else {
        getFeed();
      }
    };
    const getPosts = () => {
      if (id && userPosts.length == 0) {
        getUserPosts(id);
      } else if (isFrens && feed.length == 0) {
        getFeed();
      } else if (feed.length == 0) {
        getFrensFeed();
      }
    };
    useEffect(() => {
      getPosts();
      return () => {
        setPostOffset(0);
        clearUserPosts();
      };
    }, []);
    const hide = (id: string) => {
      setHideRow([...hideRow, id]);
    };
    return (
      <div className={style.twitter__feed}>
        {(!id || id == user?._id) && <MessageSend id={id} />}
        <div>
          {currentFeed
            .filter((el) => !hideRow.includes(el._id))
            ?.map((el, i) => {
              if (!el.isRepost && !el.originalPost) {
                //@ts-ignore
                return (
                  <>
                    <TwitterPost key={el._id} post={el} isProfile={isProfile} />
                    {i !== 0 && i % 99 == 0 && (
                      <InView
                        as="div"
                        triggerOnce
                        onChange={(inView, entry) => {
                          if (inView) {
                            console.log("inview");
                            updatePosts();
                          }
                        }}
                      ></InView>
                    )}
                  </>
                );
              } else if (el.isRepost) {
                return (
                  <div key={el._id}>
                    {!el.isDeleted && (
                      <>
                        <div className={style.twitter__repost}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Swap isActive={false} />
                            {el.user.twitterName} reposted
                          </div>
                          {user?.twitterId == el.user?.twitterId ? (
                            <img
                              src="../icons/Close.svg"
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                deletePost(el._id).then((res) => {
                                  if (res) {
                                    hide(el._id);
                                  }
                                })
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
