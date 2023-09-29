
import ConnectButtonCustom from "./connectButtonCustom";
import { observer } from "mobx-react";
import style from "./header.module.scss";

const headerText = ["Airdrop", "Staking", "Docs"];

const Header = observer(() => {
  return (
    <div className={style.header__container}>
      <header className={style.header}>
        <img src="../logo.svg" />
        <div  className={style.header__row}>
          {headerText.map((el, i)=>{
            return (
              <div key={i}>{el}</div>
            )
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
