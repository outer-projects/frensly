import Link from "next/link";
import { fromWeiToEth, getDate, getDateTime } from "../../../utils/utilities";
import style from "../explore.module.scss";
import { observer } from "mobx-react";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import { CommunityStore } from "../../../stores/CommunityStore";
import classNames from "classnames";
import { useState } from "react";
import Countdown from "react-countdown";

const PresaleListItem = observer(({ presale }: any) => {
  const { community, address, authSummaryCheck } = useInjection(Web3Store);
  const { getPresaleList } = useInjection(CommunityStore);
  const [hide, setHide] = useState(false);
  const rendererStart = ({ days, hours, minutes, seconds, completed }: any) => {
    if (
      completed &&
      presale.status == "INCOMING" &&
      Date.now() > new Date(presale?.presaleStart).getTime()
    ) {
      setHide(true);
    } else {
      // Render a countdown
      return (
        <div className={style.time}>
          <span>
            {Number(days) < 10 ? "0" : ""}
            {days}
            {" "}:
          </span>
          <span>
            {Number(hours) < 10 ? "0" : ""}
            {hours}
            {" "}:
          </span>
          <span>
            {Number(minutes) < 10 ? "0" : ""}
            {minutes}
            {" "}:
          </span>
          <span>
            {Number(seconds) < 10 ? "0" : ""}
            {seconds}
          </span>
        </div>
      );
    }
  };
  const rendererFinish = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (
      completed &&
      presale.status == "INCOMING" &&
      Date.now() > new Date(presale?.presaleStart).getTime()
    ) {
      setHide(true);
    } else {
      // Render a countdown
      return (
        <div className={style.time}>
          <span>
            {Number(days) < 10 ? "0" : ""}
            {days}
            {" "}:
          </span>
          <span>
            {Number(hours) < 10 ? "0" : ""}
            {hours}
            {" "}:
          </span>
          <span>
            {Number(minutes) < 10 ? "0" : ""}
            {minutes}
            {" "}:
          </span>
          <span>
            {Number(seconds) < 10 ? "0" : ""}
            {seconds}
            {" "}:
          </span>
        </div>
      );
    }
  };
  const finalize = async () => {
    try {
      const res = await community.methods
        .finalizePresale(presale.pondId)
        .send({ from: address });
      console.log(res);
      getPresaleList(presale.status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={style.presale__table__row}
      style={{ display: hide ? "none" : "flex" }}
    >
      <div className={style.row__1}>
        <img src={presale?.preview ? presale?.preview : "../Avatar.svg"} />
      </div>
      <div className={style.row__2}>{presale?.name}</div>
      <div className={style.row__3}>{Number(presale?.supply) / 10 ** 6}</div>
      <div className={style.row__5}>{fromWeiToEth(presale?.price, 8)}</div>
      <div className={style.row__6}>
        <Link href={"/profile/" + presale?.creator?.profile?.twitterHandle}>
          {presale?.creator?.profile?.twitterName}
        </Link>
      </div>
      <div className={style.row__7}>
        {" "}
        {presale.status == "ONGOING" && (
          <Countdown
            date={new Date(presale?.presaleStart)}
            renderer={rendererStart}
          />
        )}
        {presale.status == "INCOMING" && (
          <Countdown
            date={new Date(presale?.presaleEnd)}
            renderer={rendererFinish}
          />
        )}
      </div>
      {/* <div className={style.row__7}>{getDateTime(presale.presaleEnd)}</div> */}
      {presale?.status == "SUCCESS" || presale.status == "FAILED" ? (
        <div className={style.row__8} onClick={finalize}>
          Finalize
        </div>
      ) : (
        <Link href={"/presales/" + presale?.handle}>
          <div
            className={classNames(
              style.row__8,
              !authSummaryCheck && style.disable
            )}
          >
            View
          </div>
        </Link>
      )}
    </div>
  );
});
export default PresaleListItem;
