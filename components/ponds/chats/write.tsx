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
          setNewMsg('')
          onSend();
        }}
      />
    </div>
  );
};
export default Write;
