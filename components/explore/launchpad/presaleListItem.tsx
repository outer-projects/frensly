import Link from "next/link";
import { fromWeiToEth } from "../../../utils/utilities";
import style from "../explore.module.scss";

const PresaleListItem = (el: any) => {
  return (
    <div className={style.presale__table__row}>
      <div className={style.row__1}>
        <img src={el.image} />
      </div>
      <div className={style.row__2}>{el.name}</div>
      <div className={style.row__3}>{Number(el.supply) / 10 ** 6}</div>
      <div className={style.row__4}>Hardcap</div>
      <div className={style.row__5}>{fromWeiToEth(el.price)}</div>
      <div className={style.row__6}>Status</div>
      <div className={style.row__7}>Time to start</div>
      <Link href={"/presale/" + el.handle}>
        <div className={style.row__8}>View</div>
      </Link>
    </div>
  );
};
export default PresaleListItem;
