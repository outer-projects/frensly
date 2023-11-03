import { useCallback, useEffect, useState } from "react";
import style from "../ponds.module.scss";
import profile from "../../profile/profile.module.scss";
import { useInjection } from "inversify-react";
import Web3Store from "../../../stores/Web3Store";
import useDarkMode from "use-dark-mode";
import GifSearch from "../../profile/gitSearch";
import { ChatStore } from "../../../stores/ChatStore";

const Write = ({
  newMsg,
  setNewMsg,
  onSend,
  file,
  members,
  gif,
  setGif,
  setFile,
}: {
  newMsg: string;
  setNewMsg: (newm: string) => void;
  onSend: () => any;
  members: any[];
  gif: string;
  setGif: (g: string) => void;
  file?: File;
  setFile: (f?: File) => void;
}) => {
  const { user } = useInjection(Web3Store);
  const { setGifList } = useInjection(ChatStore);
  const [openGifMenu, setOpenGifMenu] = useState(false);
  const [openMentions, setOpenMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const onKeyDown = (e: any) => {
    // console.log(e, e.key);
    if (e.key == "Enter" && (newMsg !== "" || file)) {
      setNewMsg("");
      onSend();
      setGif("");
    }
    if (e.key == "@") {
      setOpenMentions(true);
    }
    // console.log(newMsg.slice(-1));
    if (e.key == "Backspace" && newMsg.slice(-1) == "@") {
      setOpenMentions(false);
    }
  };
  useEffect(() => {
    if (gif !== "") {
      setFile(undefined);
      setGifList([]);
      setOpenGifMenu(false);
    }
  }, [gif]);
  useEffect(() => {
    if (file) {
      setGif("");
    }
  }, [file]);
  const mention = (el: string) => {
    setNewMsg(newMsg.replace(mentionSearch, "") + el);
    setOpenMentions(false);
  };
  const darkMode = useDarkMode();
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [newMsg]);
  return (
    <>
      <div className={style.write}>
        {openGifMenu && <GifSearch setGif={setGif} reverse={true} />}
        {openMentions && (
          <div className={style.write__mentions}>
            {members
              .filter((el) => el.twitterId !== user?.twitterId)
              .filter((el) => el.twitterHandle.includes(mentionSearch))
              .map((el: any, i: number) => {
                return (
                  <div
                    className={style.write__mention}
                    key={i}
                    onClick={() => mention(el.twitterHandle)}
                  >
                    @{el.twitterHandle}
                  </div>
                );
              })}
          </div>
        )}
        <input
          type="file"
          accept=".jpg,.jpeg,.webm,.png, .gif"
          className={profile.twitter__send__img}
          style={{ transform: "translateY(20px)" }}
          onChange={(e) => e?.target?.files && setFile(e?.target?.files[0])}
        />
        <img src="../icons/ImageAdd.svg" style={{ cursor: "pointer" }} />
        <img
          src="../icons/gifAdd.svg"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenGifMenu(true);
          }}
        />
        <input
          className={style.write__input}
          value={newMsg}
          onChange={(e) => {
            let after = e.target.value.split("@");
            let key = e.target.value.substring(e.target.value.length - 1);
            // console.log(key);
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
              setMentionSearch(after[after.length - 1]);
            } else {
              setMentionSearch("");
            }
            setNewMsg(e.target.value);
          }}
          placeholder="Write something"
        />
        <img
          src="../icons/twitterUI/Send.svg"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (newMsg !== "" || file) {
              setNewMsg("");
              setGif("");
              setOpenMentions(false);
              onSend();
            }
          }}
        />
      </div>
      {file && (
        <div
          className={profile.twitter__image__name}
          style={{ marginLeft: "20px", marginTop: "7px" }}
        >
          {file?.name}
          <img
            src="../icons/Close.svg"
            style={{
              cursor: "pointer",
              filter: `invert(${darkMode.value ? "1" : "0"})`,
            }}
            onClick={() => {
              setFile(undefined);
            }}
          />
        </div>
      )}
      {gif !== "" && (
        <div
          className={profile.twitter__image__name}
          style={{ marginLeft: "20px", marginTop: "7px" }}
        >
          {gif?.split("/")[gif?.split("/")?.length - 1]}
          <img
            src="../icons/Close.svg"
            style={{
              cursor: "pointer",
              filter: `invert(${darkMode.value ? "1" : "0"})`,
            }}
            onClick={() => {
              setGif("");
            }}
          />
        </div>
      )}
    </>
  );
};
export default Write;
