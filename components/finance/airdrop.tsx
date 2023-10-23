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
          <div className={classNames(explore.explore__title, style.mob__link)}><Link href={"/finance"}>My funds</Link></div>
          <div className={classNames(explore.explore__title, style.mob__link)}><Link href={"/finance/invite"}>Referral system</Link></div>
          <div className={explore.explore__title}>Airdrop</div>
        </div>
        <div className={style.finance}>
          <User stage="airdrop"/>
          <div className={style.finance__points}>
            Your friend.tech points count: 121,234
          </div>
          <div className={style.finance__gain}>100.000 $FREN</div>
          <div className={style.finance__total}>Total claimable</div>
          <button
            className={classNames(
              header.connect__button,
              style.airdrop__claim__button
            )}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};
export default Airdrop;
