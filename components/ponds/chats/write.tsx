import { useCallback, useEffect } from "react";
import style from "../ponds.module.scss";
import profile from "../../profile/profile.module.scss";
const Write = ({
  newMsg,
  setNewMsg,
  onSend,
  file,
  setFile,
}: {
  newMsg: string;
  setNewMsg: (newm: string) => void;
  onSend: () => any;
  file?: File;
  setFile: (f?: File) => void;
}) => {
  const onKeyDown = (e: any) => {
    // console.log(e.key, e.key == "Enter", newMsg !== "" || file);
    if (e.key == "Enter" && (newMsg !== "" || file)) {
      setNewMsg("");
      onSend();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [newMsg]);
  return (
    <>
      <div className={style.write}>
        <input
          type="file"
          accept=".jpg,.jpeg,.webm,.png, .gif"
          className={profile.twitter__send__img}
          style={{ transform: "translateY(20px)" }}
          onChange={(e) => e?.target?.files && setFile(e?.target?.files[0])}
        />
        <img src="../icons/ImageAdd.svg" style={{ cursor: "pointer" }} />

        <input
          className={style.write__input}
          value={newMsg}
          onChange={(e) => {
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
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFile(undefined);
            }}
          />
        </div>
      )}
    </>
  );
};
export default Write;
