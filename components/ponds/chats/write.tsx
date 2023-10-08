import style from "../ponds.module.scss";

const Write = () => {
  return (
    <div className={style.write}>
      <img src="../icons/ImageAdd.svg" />
      <input className={style.write__input} placeholder="Write something" />
      <img src="../icons/twitterUI/Send.svg"/>
    </div>
  );
};
export default Write;
