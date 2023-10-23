import { fromWeiToEth, getDate, timePassed } from "../../utils/utilities";
import style from "./notifications.module.scss";
export const getActivity = (type: string) => {
  switch (type) {
    case "BUY":
      return " bought";
    case "OWN_BUY":
      return " bought";
    case "SELL":
      return " sell";
    case "OWN_SELL":
      return " sell";
    case "INIT":
      return " initialized successfully";
    case "LIKE":
      return " liked your post";
    case "REPOST":
      return " reposted you";
    case "COMMENT":
      return " commented your post";
    case "MENTION":
      return " mentioned you";
    case "FOLLOW":
      return " followed you";

    default:
      return type.toLowerCase();
  }
};
const OneActivity = ({ activity }: { activity: any }) => {
  return (
    <div className={style.activity__one}>
      <div className={style.activity__one__left}>
        <div className={style.activiy__one__users}>
          <img src={activity?.account?.profile?.avatar} />
          <img src={activity?.subject?.profile?.avatar} />
        </div>
        <div>
          <div className={style.nots__one__text}>
            {activity?.account?.profile?.twitterName}{" "}
            {getActivity(activity?.type)}{" "}
            {activity?.type !== "INIT" && Number(activity?.amount) / 10 ** 6}{" "}
            {activity?.type !== "INIT" &&
              activity?.type !== "OWN_BUY" &&
              activity?.type !== "OWN_SELL" &&
              activity.subject?.profile?.twitterName}
            {(activity?.type == "OWN_BUY" || activity?.type == "OWN_SELL") &&
              "my shares"}
          </div>
          <div className={style.nots__one__info}>
            <div className={style.activiy__one__time}>
              {timePassed(activity.date)} ago
            </div>
          </div>
        </div>
      </div>
      <div className={style.activiy__one__price}>
        <img src="../icons/Ethereum.svg" />
        {fromWeiToEth(activity.price)} ETH
      </div>
    </div>
  );
};
export default OneActivity;
