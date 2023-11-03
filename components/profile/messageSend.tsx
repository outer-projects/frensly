import { useEffect, useState } from "react";
import style from "./profile.module.scss";
import write from "../ponds/ponds.module.scss";
import classNames from "classnames";
import header from "../layout/header.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useInjection } from "inversify-react";
import { FeedStore } from "../../stores/FeedStore";
import { observer } from "mobx-react";
import Web3Store from "../../stores/Web3Store";
import { ExploreStore } from "../../stores/ExploreStore";
import useDarkMode from "use-dark-mode";
import { ChatStore } from "../../stores/ChatStore";
import GifSearch from "./gitSearch";

const MessageSend = observer(({ id }: { id?: string }) => {
  const [message, setMessage] = useState("");
  const [openMentions, setOpenMentions] = useState(false);
  const [focus, setFocus] = useState(false);
  const [gifMenu, setGifMenu] = useState(false);
  const [gif, setGif] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { user } = useInjection(Web3Store);
  const { setGifList } = useInjection(ChatStore);
  const [ment, setMent] = useState("");
  const [tt, updateTimeout] = useState<any>(undefined);
  const { addPost } = useInjection(FeedStore);
  const { searchUsers, mentionSearch, getTopFive, topFive } =
    useInjection(ExploreStore);
  const searchDeb = (fn: any, ms: number) => {
    const clear = () => {
      clearTimeout(tt);
      updateTimeout(setTimeout(fn, ms));
    };
    return clear();
  };
  useEffect(() => {
    if (gif !== "") {
      setImage(null);
      setGifList([])
      setGifMenu(false);
    }
  }, [gif]);
  useEffect(() => {
    if (image) {
      setGif('');
    }
  }, [image]);
  const saveInput = () => {
    searchUsers(ment, "mention");
  };
  const darkMode = useDarkMode();
  // console.log(ment);
  useEffect(() => {
    if (ment.length !== 0) {
      searchDeb(saveInput, 700);
    }
  }, [ment]);
  const mention = (el: string) => {
    setMessage(message.replace(ment, "") + el);
    setOpenMentions(false);
  };
  useEffect(() => {
    if (openMentions && topFive.length == 0) {
      getTopFive();
    }
  }, [openMentions]);
  return (
    <div>
      <div>
        {openMentions && (
          <div
            className={write.write__mentions__post}
            style={{ fontFamily: "DMSans" }}
          >
            {(mentionSearch.length == 0 ? topFive : mentionSearch)
              .filter((el) => el.twitterId !== user?.twitterId)

              .map((el: any, i: number) => {
                return (
                  <div
                    className={write.write__mention}
                    key={i}
                    onClick={() => mention(el.twitterHandle)}
                  >
                    @{el.twitterHandle}
                  </div>
                );
              })}
          </div>
        )}
        <TextareaAutosize
          value={message}
          style={{ resize: "none" }}
          placeholder="What is happening?"
          className={classNames(
            style.twitter__textarea,
            focus && style.twitter__active
          )}
          onBlur={() => {
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onChange={(e: any) => {
            // console.log(e.key)
            let after = e.target.value.split("@");
            // console.log(after[after.length - 1]);
            let key = e.target.value.substring(e.target.value.length - 1);
            console.log(key);
            if (key == "@") {
              setOpenMentions(true);
            }
            if (key == " ") {
              setOpenMentions(false);
            }
            if (!e.target.value.includes("@")) {
              setOpenMentions(false);
            }
            if (openMentions) {
              setMent(after[after.length - 1]);
            } else {
              setMent("");
            }
            setMessage(e.target.value);
          }}
        />
        {gifMenu && <GifSearch reverse={false} setGif={setGif} />}
        <div className={style.twitter__add}>
          <input
            type="file"
            accept=".jpg,.jpeg,.webm,.png, .gif"
            className={style.twitter__send__img}
            onChange={(e) => e?.target?.files && setImage(e?.target?.files[0])}
          />
          {/* <input
            type="file"
            accept=".gif"
            className={style.twitter__send__gif}
            onChange={(e) => e?.target?.files && setImage(e?.target?.files[0])}
          /> */}
          <img src="../../icons/ImageAdd.svg" />
          <img
            src="../../icons/gifAdd.svg"
            onClick={() => {
              setGifMenu(true);
            }}
          />
        </div>
        <div className={classNames(style.twitter__button)}>
          <button
            className={classNames(header.connect__button, style.twitter__post)}
            disabled={message.length == 0}
            onClick={() => {
              setOpenMentions(false);
              addPost({
                text: message,
                media: image,
                id: id,
                isVerified: user?.verified,
                gif: gif
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
      {image && (
        <div className={style.twitter__image__name}>
          {image?.name}
          <img
            src="../icons/Close.svg"
            style={{
              cursor: "pointer",
              filter: `invert(${darkMode.value ? "1" : "0"})`,
            }}
            onClick={() => {
              setImage(null);
            }}
          />
        </div>
      )}
      {gif!=='' && (
        <div className={style.twitter__image__name}>
          {gif.split("/")[gif.split("/").length - 1]}
          <img
            src="../icons/Close.svg"
            style={{
              cursor: "pointer",
              filter: `invert(${darkMode.value ? "1" : "0"})`,
            }}
            onClick={() => {
              setGif('');
            }}
          />
        </div>
      )}
    </div>
  );
});
export default MessageSend;
