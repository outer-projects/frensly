import classNames from "classnames";
import style from "./finance.module.scss";
import Link from "next/link";
import { links } from "./finance";
import explore from "../explore/explore.module.scss";
import User from "./user";
import header from "../layout/header.module.scss";
import { useInjection } from "inversify-react";
import { useRouter } from "next/router";
import Sidebar from "./sidebar";
const Airdrop = () => {
  const router = useRouter();
  return (
    <div className={style.finance__page}>
      <Sidebar />

      <div className={style.finance__container}>
        <div className={style.finance__titles}>
          <div className={classNames(explore.explore__title, style.mob__link)}>
            <Link href={"/dashboard/finance"}>My funds</Link>
          </div>
          <div className={classNames(explore.explore__title, style.mob__link)}>
            <Link href={"/dashboard/invite"}>Referral system</Link>
          </div>
          <div className={explore.explore__title}>Airdrop</div>
        </div>
        <div className={style.finance}>
          <User stage="airdrop" />
          <div className={style.finance__invite}>Tier system</div>
          <div className={style.finance__invite__text}>
            Higher tier gives you more opportunities in our app and future
            airdrop. To move to the next tier you need to fulfill the following
            conditions
          </div>
          <div className={style.finance__total}>
            <img src="../../icons/User.svg" />
            <div>
              <div className={style.finance__total__text}>Invite frens</div>
              <div className={style.finance__total__count}>1 / 3</div>
            </div>
          </div>
          <div className={style.finance__total}>
            <img src="../../icons/User.svg" />
            <div>
              <div className={style.finance__total__count}>
                Buy someone's share
              </div>
            </div>
          </div>
          <div className={style.finance__invite}>Your points</div>
          <div className={style.finance__invite__text}>
            Points will play the role in the future airdrop
          </div>
          <div className={style.finance__total__points}>
            <div className={style.finance__total__points__count}>10028</div>
            <div className={style.finance__total__points__claimable}>Total claimable</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Airdrop;
