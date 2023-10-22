import style from "./profile.module.scss";
import MessageSend from "./messageSend";
import TwitterPost from "./twitterPost";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import { FeedStore } from "../../stores/FeedStore";
import Web3Store from "../../stores/Web3Store";
import Swap from "../socials/twitterUI/Swap";

const TwitterFeed = observer(
  ({ id, isProfile }: { id?: string; isProfile?: boolean }) => {
    const { feed, getFeed, getUserPosts, userPosts, deletePost } =
      useInjection(FeedStore);
    const { user } = useInjection(Web3Store);
    const [hideRow, setHideRow] = useState<string[]>([]);
    useEffect(() => {
      if (id) {
        getUserPosts(id);
      } else {
        getFeed();
      }
    }, []);
    const hide = (id: string) => {
      setHideRow([...hideRow, id]);
    };
    return (
      <div className={style.twitter__feed}>
        {(!id || id == user?._id) && <MessageSend id={id} />}
        <div>
          {(id ? userPosts : feed)
            .filter((el) => !hideRow.includes(el._id))
            ?.map((el, i) => {
              if (!el.isRepost && !el.originalPost) {
                //@ts-ignore
                return <TwitterPost key={el._id} post={el} isProfile={isProfile}/>;
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
                        <TwitterPost post={el?.originalPost} isRepost isProfile={isProfile}/>
                      </>
                    )}
                  </div>
                );
              }
            })}
        </div>
        {(id ? userPosts.length == 0 : feed.length == 0) && (
          <div className={style.twitter__empty}>No activity yet</div>
        )}
      </div>
    );
  }
);
export default TwitterFeed;
