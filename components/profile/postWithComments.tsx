import { useEffect, useState } from "react";
import style from "./profile.module.scss";
import classNames from "classnames";
import header from "../layout/header.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useInjection } from "inversify-react";
import { FeedStore } from "../../stores/FeedStore";
import { observer } from "mobx-react";
import { IPost } from "../../types/feed";
import TwitterPost from "./twitterPost";
import { useRouter } from "next/router";

const PostWithComments = observer(() => {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { addPost, getCurrentPost, currentPost, setCurrentPost } =
    useInjection(FeedStore);
  useEffect(() => {
    if (id) {
      getCurrentPost(id as string);
    }
  }, [id]);
  useEffect(() => {
    return () => {
      setCurrentPost(undefined);
    };
  }, []);
  return (
    <div className={style.twitter__one__post__wrap}>
      {currentPost && <TwitterPost post={currentPost} isOnePostPage />}

      <div>
        <TextareaAutosize
          value={message}
          style={{ resize: "none" }}
          placeholder="What is happening?"
          className={classNames(
            style.twitter__textarea,
            focus && style.twitter__active
            // style.twitter__textarea__comment
          )}
          onBlur={() => {
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
        />
        <div
          className={classNames(
            // style.twitter__add__comment,
            style.twitter__add
          )}
        >
          <input
            type="file"
            accept=".jpg,.jpeg,.webm,.png"
            className={style.twitter__send__img}
            onChange={(e) => e?.target?.files && setImage(e?.target?.files[0])}
          />
          <input
            type="file"
            accept=".gif"
            className={style.twitter__send__gif}
            onChange={(e) => e?.target?.files && setImage(e?.target?.files[0])}
          />
          <img src="../../icons/ImageAdd.svg" />
          <img src="../../icons/gifAdd.svg" />
        </div>
        <div
          className={classNames(
            style.twitter__button
            // style.twitter__button__comment
          )}
        >
          <button
            className={classNames(
              header.connect__button,
              style.twitter__post
              // style.twitter__post__comment
            )}
            disabled={message.length == 0}
            onClick={() => {
              addPost({
                text: message,
                media: image,
                originalPost: currentPost?._id,
              }).then((res) => {
                if (res) {
                  setMessage("");
                  setImage(null);
                }
              });
            }}
          >
            Post
          </button>
        </div>
      </div>

      {currentPost &&
        currentPost?.comments
          .map((el) => {
            return <TwitterPost key={el._id} post={el} isComment={true} />;
          })
          .reverse()}
    </div>
  );
});
export default PostWithComments;
