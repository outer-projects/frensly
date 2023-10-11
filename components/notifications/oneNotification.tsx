import style from "./notifications.module.scss";
const OneNotification = () => {
  return (
    <div className={style.nots__one}>
      <div className={style.nots__one__users}>
        <img src="../Avatar.svg" />
        <img src="../Avatar.svg" />
      </div>
      <div>
        <div className={style.nots__one__text}>
          Golden Teacher bought 1 Alexly key
        </div>
        <div className={style.nots__one__info}>
          <div className={style.nots__one__price}>0.001 ETH</div>
          <div className={style.nots__one__time}>15h ago</div>
        </div>
      </div>
    </div>
  );
};
export default OneNotification;
