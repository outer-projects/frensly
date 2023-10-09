import { observer } from "mobx-react";
import style from "./finance.module.scss";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { addressSlice } from "../../utils/utilities";

const User = observer(() => {
  const { user, balance} = useInjection(Web3Store);
  return (
    <div className={style.finance__row}>
      <div className={style.finance__title}>
        <img src={user?.avatar} />
        <div>
          <div className={style.finance__name}>
            {user?.twitterName}{" "}
            <img
              src="../icons/twitter_black.svg"
              style={{ marginRight: "5px" }}
            />{" "}
            <span>@{user?.twitterHandle}</span>
          </div>
          <div className={style.finance__subtitle}>{addressSlice(user?.account?.address)}</div>
        </div>
      </div>
      <div className={style.finance__title}>
        <div className={style.finance__balance}>
          <div className={style.finance__balance__value}>
            <img src="../icons/Ethereum.svg" />
            {balance}
          </div>
          <div className={style.finance__subtitle}>Wallet balance</div>
        </div>
      </div>
    </div>
  );
});
export default User;
