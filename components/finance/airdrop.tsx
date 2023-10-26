import classNames from "classnames";
import style from "./finance.module.scss";
import Link from "next/link";
import explore from "../explore/explore.module.scss";
import User from "./user";
import { useRouter } from "next/router";
import Sidebar from "./sidebar";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { useEffect, useState } from "react";
import { UserStore } from "../../stores/UserStore";
import Message from "../socials/twitterUI/Message";
import UserIcon from "../socials/twitterUI/UserIcon";
import EthereumIcon from "../socials/ethereum";
import { fromWeiToEth } from "../../utils/utilities";
import Heart from "../socials/twitterUI/Heart";
import Follow from "../socials/twitterUI/Follow";
const getOutputByKey = (require: any, progress: any) => {
  console.log(require);
  if (require[0] == "isFollowing") {
    return (
      <div
        className={classNames(
          style.finance__total,
          progress[1] && style.finance__total__complete
        )}
      >
        <div className={style.finance__icon}>
          <UserIcon color={progress[1] ? "#A6D000" : "#676766"} />
        </div>
        <div className={style.finance__text}>
          <div className={style.finance__total__text}>Follow someone</div>
          <div className={style.finance__total__count}>
            {progress[1] ? 1 : 0} {" / "} {require[1]}
          </div>
        </div>
      </div>
    );
  }
  if (require[0] == "post") {
    return (
      <div
        className={classNames(
          style.finance__total,
          progress[1] && style.finance__total__complete
        )}
      >
        <div className={style.finance__icon}>
          <Message color={progress[1] ? "#A6D000" : "#676766"} />
        </div>
        <div className={style.finance__text}>
          <div className={style.finance__total__text}>Post something</div>
          <div className={style.finance__total__count}>
            {progress[1] ? 1 : 0} {" / "} {require[1]}
          </div>
        </div>
      </div>
    );
  }
  if (require[0] == "totalVolume" && require[1] == "1") {
    return (
      <div
        className={classNames(
          style.finance__total,
          progress[1] !== "0" && style.finance__total__complete
        )}
      >
        <div className={style.finance__icon}>
          <EthereumIcon color={progress[1] !== "0" ? "#A6D000" : "#676766"} />
        </div>
        <div className={style.finance__text}>
          <div className={style.finance__total__count}>Buy someone's share</div>
        </div>
      </div>
    );
  }
  if (require[0] == "totalVolume" && require[1] !== "1") {
    return (
      <div
        className={classNames(
          style.finance__total,
          Number(progress[1] >= Number(require[1])) &&
            style.finance__total__complete
        )}
      >
        <div className={style.finance__icon}>
          <EthereumIcon
            color={
              Number(progress[1] >= Number(require[1])) ? "#A6D000" : "#676766"
            }
          />
        </div>
        <div className={style.finance__text}>
          <div className={style.finance__total__text}>Total Volume</div>
          <div className={style.finance__total__count}>
            {fromWeiToEth(progress[1])}
            {" / "}
            {fromWeiToEth(require[1])}
          </div>
        </div>
      </div>
    );
  }
  if (require[0] == "referrals") {
    return (
      <div
        className={classNames(
          style.finance__total,
          progress[1] >= require[1] && style.finance__total__complete
        )}
      >
        <div className={style.finance__icon}>
          <UserIcon color={progress[1] >= require[1] ? "#A6D000" : "#676766"} />
        </div>
        <div className={style.finance__text}>
          <div className={style.finance__total__text}>Invite frens</div>
          <div className={style.finance__total__count}>
            {progress[1] + " / " + require[1]}
          </div>
        </div>
      </div>
    );
  }
  if (require[0] == "likes") {
    return (
      <div
        className={classNames(
          style.finance__total,
          progress[1] >= require[1] && style.finance__total__complete
        )}
      >
        <div className={style.finance__icon}>
          <Heart color={progress[1] >= require[1] ? "#A6D000" : "#676766"} />
        </div>
        <div className={style.finance__text}>
          <div className={style.finance__total__text}>Like posts</div>
          <div className={style.finance__total__count}>
            {progress[1] + " / " + require[1]}
          </div>
        </div>
      </div>
    );
  }
  if (require[0] == "isFollowedBy") {
    return (
      <div
        className={classNames(
          style.finance__total,
          progress[1] >= require[1] && style.finance__total__complete
        )}
      >
        <div className={style.finance__icon}>
          <Follow color={progress[1] >= require[1] ? "#A6D000" : "#676766"} />
        </div>
        <div className={style.finance__text}>
          <div className={style.finance__total__text}>Get followers</div>
          <div className={style.finance__total__count}>
            {progress[1] + " / " + require[1]}
          </div>
        </div>
      </div>
    );
  }
};
const Airdrop = observer(() => {
  const [keysReady, setKeysReady] = useState(false)
  const { user } = useInjection(Web3Store);
  const { getKeys, currentRequire, currentProgress, finished } =
    useInjection(UserStore);

  useEffect(() => {
    if (user && !keysReady) {
      setKeysReady(true)
      getKeys();
    }
  }, [user]);
  return (
    <div className={style.finance__page}>
      <Sidebar />

      <div className={style.finance__container}>
        <div className={style.finance__titles}>
          <div className={classNames(explore.explore__title, style.mob__link)}>
            <Link href={"/dashboard/finance"}>Funds</Link>
          </div>
          <div className={classNames(explore.explore__title, style.mob__link)}>
            <Link href={"/dashboard/invite"}>Referrals</Link>
          </div>
          <div className={explore.explore__title}>Airdrop</div>
        </div>
        <div className={style.finance}>
          <User stage="airdrop" />
          {!finished && (
            <>
              <div className={style.finance__invite}>Tier system</div>
              <div className={style.finance__invite__text}>
                Higher tier gives you more opportunities in our app and future
                airdrop. To move to the next tier you need to fulfill the
                following conditions
              </div>
              {currentRequire.map((req: any, i: number) => {
                return (
                  <div key={i}>{getOutputByKey(req, currentProgress[i])}</div>
                );
              })}
            </>
          )}
          <div className={style.finance__invite}>Your points</div>
          <div className={style.finance__invite__text}>
            Points will play the role in the future airdrop
          </div>
          <div className={style.finance__total__points}>
            <div className={style.finance__total__points__count}>
              {user?.points}
            </div>
            <div className={style.finance__total__points__claimable}>
              Total claimable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Airdrop;
