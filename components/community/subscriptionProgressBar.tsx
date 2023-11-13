import style from "../create/create.module.scss";
const SubscriptionProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      className={style.progress__bar__contain}
      style={{ marginTop: "16px", marginBottom: "16px" }}
    >
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
export default SubscriptionProgressBar;
