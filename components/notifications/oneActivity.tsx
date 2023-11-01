import classNames from "classnames";
import {
  fromWeiToEth,
  getDate,
  shortNick,
  timePassed,
} from "../../utils/utilities";
import style from "./notifications.module.scss";
import Link from "next/link";
import EthereumSvg from "../svgs/Ethereum";
export const getActivity = (type: string, isOriginalPost?: string) => {
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
      if (!isOriginalPost) {
        return " commented on your post";
      } else {
        return " answered to your comment";
      }

    case "MENTION":
      return " tagged you in";
    case "FOLLOW":
      return " followed you";

    default:
      return type.toLowerCase();
  }
};
const OneActivity = ({ activity }: { activity: any }) => {
  return (
    <div className={style.activity__one__container}>
      <div className={style.activity__one}>
        <div className={style.activity__one__left}>
          <div className={style.activiy__one__users}>
            <img src={activity?.account?.profile?.avatar} />
            <img src={activity?.subject?.profile?.avatar} />
          </div>
          <div>
            <div className={style.nots__one__text}>
              <span>
                <Link
                  href={"/profile/" + activity?.account?.profile?.twitterId}
                >
                  {shortNick(activity?.account?.profile?.twitterName)}
                </Link>{" "}
              </span>
              {getActivity(activity?.type, activity?.source?.originalPost)}{" "}
              {activity?.type !== "INIT" && Number(activity?.amount) / 10 ** 6}{" "}
              {activity?.type !== "INIT" &&
                activity?.type !== "OWN_BUY" &&
                activity?.type !== "OWN_SELL" && (
                  <span>
                    <Link
                      href={"/profile/" + activity?.subject?.profile?.twitterId}
                    >
                      {shortNick(activity?.subject?.profile?.twitterName)}
                    </Link>{" "}
                  </span>
                )}
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
        <div
          className={classNames(
            style.activiy__one__price,
            activity?.type.includes("SELL") && style.activiy__one__price__sell
          )}
        >
          <EthereumSvg />
          {fromWeiToEth(activity.price)} ETH
        </div>
      </div>
      <div
        className={classNames(
          style.activiy__one__price__mobile,
          activity?.type.includes("SELL") && style.activiy__one__price__sell
        )}
      >
        <EthereumSvg/>
        {fromWeiToEth(activity.price)} ETH
      </div>
    </div>
  );
};
export default OneActivity;
