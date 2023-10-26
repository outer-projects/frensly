import { observer } from "mobx-react";
import style from "./finance.module.scss";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { addressSlice } from "../../utils/utilities";
import { UserStore } from "../../stores/UserStore";
import { useEffect } from "react";

const User = observer(({ stage }: { stage: string }) => {
  const { user, balance } = useInjection(Web3Store);
  const { getCurrentTier } = useInjection(UserStore);
  useEffect(()=>{
    getCurrentTier()
  },[])
  return (
    <div className={style.finance__row}>
      <div className={style.finance__title}>
        <img src={user?.avatar} className={style.finance__avatar} />
        <div>
          <div className={style.finance__name}>
            {user?.twitterName}{" "}
            <a
              href={`https://twitter.com/${user?.twitterHandle}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="../icons/twitter_black.svg"
                style={{ marginRight: "5px", width: "24px", height: "24px" }}
              />{" "}
            </a>
            <a
              href={`https://twitter.com/${user?.twitterHandle}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span>@{user?.twitterHandle}</span>
            </a>
          </div>
          <div className={style.finance__subtitle}>
            <a
              href={`https://basescan.org/address/${user?.account?.address}`}
              target="_blank"
            >
              {addressSlice(user?.account?.address)}
            </a>
          </div>
        </div>
      </div>
      {stage == "finance" && (
        <div className={style.finance__title}>
          <div className={style.finance__balance}>
            <div className={style.finance__balance__value}>
              <img src="../icons/Ethereum.svg" />
              {balance}
            </div>
            <div className={style.finance__subtitle}>Wallet balance</div>
          </div>
        </div>
      )}
      {(stage == "referral" || stage == "airdrop") && (
        <div className={style.finance__tier}>Tier: {user?.tier}</div>
      )}
    </div>
  );
});
export default User;
