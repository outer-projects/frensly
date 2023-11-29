import style from "../create/create.module.scss";
const SubscriptionProgressBar = ({
  progress,
  supply,
  goal,
}: {
  progress: number;
  supply: number;
  goal: number;
}) => {
  // console.log(progress, supply, goal);
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
        <div className={style.progress__bar__text}>{supply} shares</div>
        <div className={style.progress__bar__text}>Total {goal} shares</div>
      </div>
    </div>
  );
};
export default SubscriptionProgressBar;
