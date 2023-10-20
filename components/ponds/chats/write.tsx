import { useCallback, useEffect, useState } from "react";
import style from "../ponds.module.scss";
import profile from "../../profile/profile.module.scss";
const linst = ["123", "123", "123"];
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
  const [openMentions, setOpenMentions] = useState(false);
  const onKeyDown = (e: any) => {
    console.log(e.key);
    if (e.key == "Enter" && (newMsg !== "" || file)) {
      setNewMsg("");
      onSend();
    }
    if (e.key == "@") {
      setOpenMentions(true);
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
        <div className={style.write__mentions}>
          {/* {linst.map((el, i) => {
            return <div className={style.write__mention} key={i}>{el}</div>;
          })} */}
        </div>
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
