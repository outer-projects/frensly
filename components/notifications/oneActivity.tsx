import style from "./notifications.module.scss";
const OneActivity = () => {
  return (
    <div className={style.activity__one}>
      <div className={style.activity__one__left}>
        <div className={style.activiy__one__users}>
          <img src="../Avatar.svg" />
          <img src="../Avatar.svg" />
        </div>
        <div>
          <div className={style.nots__one__text}>
            Golden Teacher bought 1 Alexly key
          </div>
          <div className={style.nots__one__info}>
            <div className={style.activiy__one__time}>15h ago</div>
          </div>
        </div>
      </div>
      <div className={style.activiy__one__price}><img src="../icons/Ethereum.svg"/>15,34 ETH</div>
    </div>
  );
};
export default OneActivity;
