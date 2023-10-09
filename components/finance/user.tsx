import style from "./finance.module.scss";

const User = () => {
  return (
    <div className={style.finance__row}>
      <div className={style.finance__title}>
        <img src="../avatar.svg" />
        <div>
          <div className={style.finance__name}>
            0xRacer{" "}
            <img
              src="../icons/twitter_black.svg"
              style={{ marginRight: "5px" }}
            />{" "}
            <span>@0xRacer</span>
          </div>
          <div className={style.finance__subtitle}>0xFakf...39f40</div>
        </div>
      </div>
      <div className={style.finance__title}>
        <div className={style.finance__balance}>
          <div className={style.finance__balance__value}>
            <img src="../icons/Ethereum.svg" />
            0.0121 ETH
          </div>
          <div className={style.finance__subtitle}>Wallet balance</div>
        </div>
      </div>
    </div>
  );
};
export default User;
