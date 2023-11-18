import classNames from "classnames";
import style from "./finance.module.scss";
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
import TypesList from "../common/typesList";
import { types } from "./invite";
import User from "./user";
import useDarkMode from "use-dark-mode";
const getOutputByKey = (require: any, progress: any) => {
  // console.log(require);
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
          <div className={style.finance__total__text}>Trades Volume</div>
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
          <div className={style.finance__total__text}>
            Get at least 3 Likes on your post
          </div>
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
const Rankings = observer(() => {
  const [active, setActive] = useState(3);
  const [closeContest, setCloseContest] = useState(false);
  const darkMode = useDarkMode();
  const [keysReady, setKeysReady] = useState(false);
  const { user } = useInjection(Web3Store);
  const {
    getKeys,
    currentRequire,
    currentProgress,
    finished,
    getPoints,
    portfolioValue,
    inviteLimit,
    invited,
    unlimitedKeys,
    getShares,
    pointsInfo,
  } = useInjection(UserStore);
  const router = useRouter();
  useEffect(() => {
    if (active == 0) {
      router.push("/dashboard/finance");
    }
    if (active == 1) {
      router.push("/dashboard/invite");
    }
    if (active == 2) {
      router.push("/dashboard/airdrop");
    }
    // if (active == 4) {
    //   router.push("/dashboard/settings");
    // }
  }, [active]);
  useEffect(() => {
    if (user && !keysReady) {
      setKeysReady(true);
      getKeys();
      getShares(user._id);
      getPoints();
    }
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem("contest") == "true") {
      setCloseContest(true);
    }
  }, []);
  return (
    <div className={style.finance__page}>
      <Sidebar />

      <div className={style.finance__container}>
        <div className={style.finance__links}>
          <TypesList active={active} setActive={setActive} types={types} />
        </div>
        <div className={style.finance}>
          <User stage="rankings" />
          {/* {!closeContest && (
            <div className={style.contest}>
              <div className={style.contest__title}>
                🐸 Contest
                <img
                  className={style.header__mobile__menu__close}
                  src="../../icons/Close.svg"
                  style={{
                    filter: `invert(${darkMode.value ? "1" : "0"})`,
                    cursor: "pointer",
                    marginTop: "-15px",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    setCloseContest(true);
                    localStorage.setItem("contest", "true");
                  }}
                />
              </div>
              <div className={style.contest__text}>
                Post your meme in twitter till 10 Nov and tag @frenslyio The top
                3 with biggest exposure receives "memetic" achievement, boosting
                your per-hour points X2 for 8 hours!
              </div>
            </div>
          )} */}
          <div className={style.finance__invite}>
            <div>Rankings</div>
            <div>Top #{pointsInfo?.place}</div>
          </div>
          <div className={style.finance__invite__text}>Your global ranking</div>
          <div className={style.finance__stat}>
            <img src="../icons/Ethereum__grey.svg" />
            <div>
              <div className={style.finance__stat__name}>Portfolio value</div>
              <div className={style.finance__stat__value}>
                {/* {portfolioValue && fromWeiToEth(portfolioValue?.toString())} ETH */}
                {portfolioValue && fromWeiToEth(portfolioValue?.toString())}{" "}
              </div>
            </div>
          </div>
          <div className={style.finance__total}>
            <div className={style.finance__icon}>
              <UserIcon color="#676766" />
            </div>
            <div>
              <div className={style.finance__total__text}>
                Total invited users
              </div>
              <div className={style.finance__total__count}>
                {" "}
                {invited}
                {!unlimitedKeys && " / " + inviteLimit}
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
});
export default Rankings;
