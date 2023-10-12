import style from "./profile.module.scss";
import MessageSend from "./messageSend";
import TwitterPost from "./twitterPost";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import { FeedStore } from "../../stores/FeedStore";
import Web3Store from "../../stores/Web3Store";
import Swap from "../socials/twitterUI/Swap";
const posts = [
  {
    date: "2023-10-12T09:48:43.557Z",
    text: "123123123",
    media:
      "https://pbs.twimg.com/profile_images/1711407146619858944/NTOqpjOQ_bigger.png",
    user: {
      avatar:
        "https://pbs.twimg.com/profile_images/1711407146619858944/NTOqpjOQ_bigger.png",
      twitterName: "twitterName",
      twitterHandle: "123Qw62434",
    },
    isRepost: false, //понятно
    reposts: [],
    _id: "",
    likes: [], //список людей которые лайкнули
    comments: [
      {
        date: "2023-10-12T09:48:43.557Z",
        text: "123123123",
        user: {
          avatar:
            "https://pbs.twimg.com/profile_images/1711407146619858944/NTOqpjOQ_bigger.png",
          twitterName: "twitterName",
          twitterHandle: "123Qw62434",
        },
        isRepost: true, //понятно
        reposts: [],
        _id: "",
        likes: [], //список людей которые лайкнули
        comments: [], //список комментов
      },
      {
        date: "2023-10-12T09:48:43.557Z",
        text: "123123123",
        user: {
          avatar:
            "https://pbs.twimg.com/profile_images/1711407146619858944/NTOqpjOQ_bigger.png",
          twitterName: "twitterName",
          twitterHandle: "123Qw62434",
        },
        isRepost: true, //понятно
        reposts: [],
        _id: "",
        likes: [], //список людей которые лайкнули
        comments: [], //список комментов
      },
    ], //список комментов
  },
  {
    date: "2023-10-12T09:48:43.557Z",
    text: "",
    user: {
      avatar:
        "https://pbs.twimg.com/profile_images/1711407146619858944/NTOqpjOQ_bigger.png",
      twitterName: "twitterName",
      twitterHandle: "123Qw62434",
    },
    isRepost: true, //понятно
    reposts: [],
    _id: "",
    originalPost: {
      date: "2023-10-12T09:48:43.557Z",
      text: "123123123",
      user: {
        avatar:
          "https://pbs.twimg.com/profile_images/1711407146619858944/NTOqpjOQ_bigger.png",
        twitterName: "twitterName",
        twitterHandle: "123Qw62434",
      },
      isRepost: true, //понятно
      reposts: [],
      _id: "",
      likes: [], //список людей которые лайкнули
      comments: [], //список комментов
    },
    likes: [], //список людей которые лайкнули
    comments: [], //список комментов
  },
];
const TwitterFeed = observer(({ id }: { id?: string }) => {
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
      {(!id || id == user?._id) && <MessageSend />}
      <div>
        {(id ? userPosts : feed)
          .filter((el) => !hideRow.includes(el._id))
          ?.map((el, i) => {
            if (!el.isRepost && !el.originalPost) {
              //@ts-ignore
              return <TwitterPost key={el._id} post={el} />;
            } else if (el.isRepost) {
              return (
                <div key={el._id}>
                  {!el.isDeleted && (
                    <>
                      <div className={style.twitter__repost}>
                        <div style={{display:'flex', alignItems:'center'}}>
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
                      <TwitterPost post={el?.originalPost} />
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
});
export default TwitterFeed;
