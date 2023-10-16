import { useCallback, useEffect } from "react";
import style from "../ponds.module.scss";

const Write = ({
  newMsg,
  setNewMsg,
  onSend,
}: {
  newMsg: string;
  setNewMsg: (newm: string) => void;
  onSend: () => any;
}) => {
  const onKeyDown = (e: any) => {
    console.log(e.key, e.key == "Enter", newMsg !== "");
    if (e.key == "Enter" && newMsg !== "") {
      setNewMsg("");
      onSend();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [newMsg]);
  return (
    <div className={style.write}>
      <img src="../icons/ImageAdd.svg" />
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
          if (newMsg !== "") {
            setNewMsg("");
            onSend();
          }
        }}
      />
    </div>
  );
};
export default Write;
