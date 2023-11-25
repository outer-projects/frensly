import Link from "next/link";
import { fromWeiToEth, getDate, getDateTime } from "../../../utils/utilities";
import style from "../explore.module.scss";
import { observer } from "mobx-react";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import { CommunityStore } from "../../../stores/CommunityStore";
import classNames from "classnames";

const PresaleListItem = observer(({ presale }: any) => {
  const { community, address, authSummaryCheck } = useInjection(Web3Store);
  const { getPresaleList } = useInjection(CommunityStore);
  const finalize = async () => {
    try {
      const res = await community.methods
        .finalizePresale(presale.pondId)
        .send({ from: address });
      console.log(res);
      getPresaleList(presale.status)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.presale__table__row}>
      <div className={style.row__1}>
        <img src={presale?.image ? presale?.image : "../Avatar.svg"} />
      </div>
      <div className={style.row__2}>{presale?.name}</div>
      <div className={style.row__3}>{Number(presale?.supply) / 10 ** 6}</div>
      <div className={style.row__5}>{fromWeiToEth(presale?.price)}</div>
      <div className={style.row__6}>
        <Link href={"/profile/" + presale?.creator?.profile?.twitterHandle}>
          {presale?.creator?.profile?.twitterName}
        </Link>
      </div>
      <div className={style.row__7}>{getDateTime(presale.presaleStart)}</div>
      <div className={style.row__7}>{getDateTime(presale.presaleEnd)}</div>
      {presale?.status == "SUCCSESS" || presale.status == "FAILED" ? (
        <div className={style.row__8} onClick={finalize}>Finalize</div>
      ) : (
        <Link href={"/presales/" + presale?.handle}>
          <div className={classNames(style.row__8, !authSummaryCheck && style.disable)}>View</div>
        </Link>
      )}
    </div>
  );
});
export default PresaleListItem;
