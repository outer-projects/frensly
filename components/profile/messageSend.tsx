import { useState } from "react";
import style from "./profile.module.scss";
import classNames from "classnames";
import header from "../layout/header.module.scss";
import TextareaAutosize from "react-textarea-autosize";

const MessageSend = () => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <TextareaAutosize
        value={message}
        style={{ resize: "none" }}
        className={style.twitter__textarea}
        onChange={(e: any) => {
          setMessage(e.target.value);
        }}
      />
      <div className={style.twitter__add}>
        <img src="../../icons/ImageAdd.svg" />
        <img src="../../icons/gifAdd.svg" />
      </div>
      <div className={style.twitter__button}>
        <button
          className={classNames(header.connect__button, style.twitter__post)}
        >
          Post
        </button>
      </div>
    </div>
  );
};
export default MessageSend;
