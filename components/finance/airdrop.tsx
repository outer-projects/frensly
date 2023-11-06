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
  const { getKeys, getPoints, pointsInfo } = useInjection(UserStore);
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
    // if (active == 4) {
    //   router.push("/dashboard/settings");
    // }
  }, [active]);
  useEffect(() => {
    if (user && !keysReady) {
      setKeysReady(true);
      getKeys();
      getPoints();
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
              <br /> The amount depends on various metrics, but basically the
              more actively you use and promote the platform, the more points
              per hour you earn
            </div>
            <div className={style.finance__total}>
              <div className={style.finance__icon}>
                <PointsIcon color="#676766" />
              </div>
              <div>
                <div className={style.finance__total__text}>
                  Points per hour
                </div>
                <div className={style.finance__total__count}>
                  {Number(Number(pointsInfo?.income).toFixed(2))}
                </div>
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
            Points play a significant role in the future airdrop
          </div>
          <div className={style.finance__total__points}>
            <div className={style.finance__total__points__count}>
              {Number(Number(pointsInfo?.points).toFixed(2))}
            </div>
            <div className={style.finance__total__points__claimable}>
              Total claimable
            </div>
          </div>
          <div className={style.finance__invite}>Methodology</div>
          <div className={style.finance__invite__text}>
            Total points include your FT points and your activity on Frensly
          </div>
          <div className={style.finance__total}>
            <div className={style.finance__icon}>
              <img src="../icons/ft.svg" />
            </div>
            <div>
              <div className={style.finance__total__text}>Your FT points</div>
              <div className={style.finance__total__count}>
                {Number(Number(pointsInfo?.friendTechPoints).toFixed(2))}
              </div>
            </div>
          </div>
          <div className={style.finance__total}>
            <div className={style.finance__icon}>
              <Frensly />
            </div>
            <div>
              <div className={style.finance__total__text}>
                Your Frensly points
              </div>
              <div className={style.finance__total__count}>
                {Number(Number(pointsInfo?.points).toFixed(2))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Airdrop;
