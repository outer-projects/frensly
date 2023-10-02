import ConnectButtonCustom from "./connectButtonCustom";
import { observer } from "mobx-react";
import style from "./header.module.scss";
import classNames from "classnames";

const headerText = ["Airdrop", "Staking"];

const Header = observer(() => {
  return (
    <div className={style.header__container}>
      <header className={style.header}>
        <img src="../logo.svg" />
        <div className={style.header__row}>
          {headerText.map((el, i) => {
            return (
              <div key={i} className={classNames(style.header__el, el == "Airdrop" && style.header__el__active, el == "Staking" && style.header__el__disabled)}>
                {el}
                {el == "Staking" && (
                  <div className={style.header__soon}>soon</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="row">
          <ConnectButtonCustom />
        </div>
      </header>
    </div>
  );
});
export default Header;
