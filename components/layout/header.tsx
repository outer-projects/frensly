import ConnectButtonCustom from "./connectButtonCustom";
import { observer } from "mobx-react";
import style from "./header.module.scss";
import classNames from "classnames";

const headerText = ["Feed", "Explore", "Chats"];

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
        <div className={style.header__user}>
          <img src="../../icons/notification.svg"style={{marginRight:'37px'}}/>
          <ConnectButtonCustom />
        </div>
      </header>
    </div>
  );
});
export default Header;
