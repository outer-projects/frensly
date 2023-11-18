import style from "../explore.module.scss";

const PresaleListItem = () => {
  return (
    <div className={style.presale__table__row}>
      <div className={style.row__1}><img src="../avatar.svg"/></div>
      <div className={style.row__2}>Name</div>
      <div className={style.row__3}>Number of shares</div>
      <div className={style.row__4}>Hardcap</div>
      <div className={style.row__5}>Cost per share</div>
      <div className={style.row__6}>Status</div>
      <div className={style.row__7}>Time to start</div>
      <div className={style.row__8}>View</div>
    </div>
  );
};
export default PresaleListItem;
