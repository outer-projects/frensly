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
import PointsIcon from "../socials/twitterUI/points";
import FtIcon from "../svgs/ft";
import Frensly from "../svgs/frensly";

const Airdrop = observer(() => {
  const [active, setActive] = useState(2);

  const [keysReady, setKeysReady] = useState(false);
  const { user } = useInjection(Web3Store);
  const { getKeys, getPoints, pointsInfo } =
    useInjection(UserStore);
  const router = useRouter();
  useEffect(() => {
    if (active == 0) {
      router.push("/dashboard/finance");
    }
    if (active == 1) {
      router.push("/dashboard/invite");
    }
    if (active == 3) {
      router.push("/dashboard/rankings");
    }
    if (active == 4) {
      router.push("/dashboard/settings");
    }
  }, [active]);
  useEffect(() => {
    if (user && !keysReady) {
      setKeysReady(true);
      getKeys();
      getPoints()
    }
  }, [user]);
  return (
    <div className={style.finance__page}>
      <Sidebar />

      <div className={style.finance__container}>
        <div className={style.finance__links}>
          <TypesList active={active} setActive={setActive} types={types} />
        </div>
        <div className={style.finance}>
          <User stage="airdrop" />
        
          <>
            <div className={style.finance__invite}>Points 1.0</div>
            <div className={style.finance__invite__text}>
              Your points are added to the profile once per hour.
              <br /> The amount depends on various metric but in general depends
              on how active you use platform.
            </div>
            <div className={style.finance__total}>
              <div className={style.finance__icon}>
                <PointsIcon color="#676766" />
              </div>
              <div>
                <div className={style.finance__total__text}>
                  Points per hour
                </div>
                <div className={style.finance__total__count}>{pointsInfo?.income}</div>
              </div>
            </div>
            {/* {currentRequire.map((req: any, i: number) => {
              return (
                <div key={i}>{getOutputByKey(req, currentProgress[i])}</div>
              );
            })} */}
          </>
          <div className={style.finance__invite}>Total points</div>
          <div className={style.finance__invite__text}>
            Points will play the role in the future airdrop
          </div>
          <div className={style.finance__total__points}>
            <div className={style.finance__total__points__count}>
              {pointsInfo?.points}
            </div>
            <div className={style.finance__total__points__claimable}>
              Total claimable
            </div>
          </div>
          <div className={style.finance__invite}>Methodology</div>
          <div className={style.finance__invite__text}>
            Your total points is calculate with your Friend Tech points plus
            your Activity on Frensly.
          </div>
          <div className={style.finance__total}>
            <div className={style.finance__icon}>
              <img src="../icons/ft.svg" />
            </div>
            <div>
              <div className={style.finance__total__text}>Your FT points</div>
              <div className={style.finance__total__count}>{pointsInfo?.friendTechPoints}</div>
            </div>
          </div>
          <div className={style.finance__total}>
            <div className={style.finance__icon}>
              <Frensly />
            </div>
            <div>
              <div className={style.finance__total__text}>Your current Frensly points</div>
              <div className={style.finance__total__count}>{pointsInfo?.points}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Airdrop;
