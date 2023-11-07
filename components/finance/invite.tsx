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
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";
import UserIcon from "../socials/twitterUI/UserIcon";
import TypesList from "../common/typesList";
import { addressSlice, shortNick } from "../../utils/utilities";
import Key from "../svgs/key";
export const types = ["Finance", "Referrals", "Airdrop", "Rankings"];
const Invite = observer(() => {
  const { user } = useInjection(Web3Store);
  const { getKeys, key, inviteLimit, invited, unlimitedKeys, inviter } =
    useInjection(UserStore);

  const [keysReady, setKeysReady] = useState(false);
  const [active, setActive] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (user && !keysReady) {
      setKeysReady(true);
      getKeys();
    }
  }, [user]);

  useEffect(() => {
    if (active == 0) {
      router.push("/dashboard/finance");
    }
    if (active == 2) {
      router.push("/dashboard/airdrop");
    }
    if (active == 3) {
      router.push("/dashboard/rankings");
    }
  }, [active]);
  return (
    <div className={style.finance__page}>
      <Sidebar />

      <div className={style.finance__container}>
        <div className={style.finance__links}>
          <TypesList active={active} setActive={setActive} types={types} />
        </div>
        <div className={style.finance}>
          <User stage="referral" />
          <div className={style.finance__invite}>Referral system</div>
          <div className={style.finance__invite__text}>
            Get more invites to boost your future airdrop and move farther in
            rankings.
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
                {invited}
                {!unlimitedKeys && " / " + inviteLimit}
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
              key?.usesLeft == 0 && style.invite__code__used
            )}
          >
            <div>
              <div className={style.invite__code__left}>
                {!unlimitedKeys ? (
                  <>
                    There are <span>{key?.usesLeft}</span> uses left
                  </>
                ) : (
                  <>Unlimited use</>
                )}
              </div>
              <div>
                {(window.location.origin + "/" + key?.code).replace(
                  "https://",
                  ""
                )}
              </div>
            </div>
            {key?.usesLeft !== 0 && (
              <CopyToClipboard
                text={window.location.origin + "/" + key?.code}
                onCopy={() => {
                  toast.success("Code is copied successfully");
                }}
              >
                <img src="../icons/copy.svg" style={{ cursor: "pointer" }} />
              </CopyToClipboard>
            )}
          </div>
          {inviter && (
            <>
              <div className={style.finance__invite}>Invited by</div>
              <div className={explore.explore__user__left}>
                <img src={inviter.avatar} />
                <div className={explore.explore__user__left__text}>
                  <div className={explore.explore__user__share}>
                    {/* @ts-ignore */}
                    {user?.account?.othersShares.filter(
                      (u) =>
                        u.subject == inviter.account._id &&
                        Number(u.amount) >= 1000000
                    )?.length >= 1 && <Key />}
                    <div>
                      {Number(inviter?.account?.sharesAmount) / 10 ** 6} share
                    </div>
                  </div>
                  <div className={explore.explore__user__name}>
                    <div>{shortNick(inviter.twitterName)}</div>
                    <span>
                      <a
                        href={"https://twitter.com/" + inviter.twitterHandle}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        @{inviter.twitterHandle}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
export default Invite;
