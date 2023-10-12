import { useState } from "react";
import style from "./profile.module.scss";
import classNames from "classnames";
import header from "../layout/header.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useInjection } from "inversify-react";
import { FeedStore } from "../../stores/FeedStore";
import { observer } from "mobx-react";

const MessageSend = observer(({ id }: { id?: string }) => {
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { addPost } = useInjection(FeedStore);

  return (
    <div>
      <div>
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
            setMessage(e.target.value);
          }}
        />
        <div className={style.twitter__add}>
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
        <div className={style.twitter__button}>
          <button
            className={classNames(header.connect__button, style.twitter__post)}
            disabled={message.length == 0}
            onClick={() => {
              addPost({ text: message, media: image, id: id }).then((res) => {
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
            style={{ cursor: "pointer" }}
            onClick={() => {
              setImage(null);
            }}
          />
        </div>
      )}
    </div>
  );
});
export default MessageSend;
