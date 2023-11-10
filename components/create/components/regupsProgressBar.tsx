import style from "../create.module.scss";
const RegupsProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className={style.progress__bar__contain}>
      <div className={style.progress__bar}>
        <div
          className={style.progress__bar__fill}
          style={{ width: progress + "%" }}
        ></div>
      </div>
      <div className={style.progress__bar__info}>
        <div className={style.progress__bar__text}>32.44 shares</div>
        <div className={style.progress__bar__text}>Total 50 Shares</div>
      </div>
    </div>
  );
};
export default RegupsProgressBar;
