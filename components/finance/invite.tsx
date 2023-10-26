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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { observer } from "mobx-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";
import { getDate } from "../../utils/utilities";
import UserIcon from "../socials/twitterUI/UserIcon";
const Invite = observer(() => {
  const { user } = useInjection(Web3Store);
  const { getKeys, key, inviteLimit, invited } = useInjection(UserStore);
  useEffect(() => {
    if (user) {
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
          <div className={explore.explore__title}>Referrals</div>
          <div className={classNames(explore.explore__title, style.mob__link)}>
            <Link href={"/dashboard/airdrop"}>Airdrop</Link>
          </div>
        </div>
        <div className={style.finance}>
          <User stage="referral" />
          <div className={style.finance__total}>
            <div className={style.finance__icon}>
              <UserIcon color="#676766" />
            </div>
            <div>
              <div className={style.finance__total__text}>
                Total invited users
              </div>
              <div className={style.finance__total__count}>
                {invited} / {inviteLimit}
              </div>
            </div>
          </div>
          <div className={style.finance__invite}>Your invite link</div>
          <div className={style.finance__invite__text}>
            The link has limitations depending on your tier. Invite more users
            to get points boost and higher tier.
          </div>

          <div
            className={classNames(
              style.invite__code,
              key.usesLeft == 0 && style.invite__code__used
            )}
          >
            <div>
              <div className={style.invite__code__left}>
                There are <span>{key.usesLeft}</span> uses left
              </div>
              <div>
                {(window.location.origin + "/" + key.code).replace(
                  "https://",
                  ""
                )}
              </div>
            </div>
            {key.usesLeft !== 0 && (
              <CopyToClipboard
                text={window.location.origin + "/" + key.code}
                onCopy={() => {
                  toast.success("Code is copied successfully");
                }}
              >
                <img src="../icons/copy.svg" style={{ cursor: "pointer" }} />
              </CopyToClipboard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Invite;
