import Link from "next/link";
import style from "../ponds.module.scss";

const ChatItem = () => {
  return (
    <Link href="/ponds/123">
      <div className={style.chat__item}>
        <div className={style.chat__info}>
          <img className={style.chat__avatar} src="../../Avatar.svg" />
          <div>
            <div className={style.chat__share}>
              <img src="../icons/Key.svg" />
              <div>2.41 share</div>
            </div>
            <div className={style.chat__name}>My chat</div>
            <div className={style.chat__text}>
              Blah Blah: who’s here?<span>7m</span>
            </div>
          </div>
        </div>
        <div>
          <div className={style.chat__value}>
            <img src="../icons/Ethereum.svg" />
            15,34 ETH
          </div>
          <div className={style.chat__dollar}>{"14400$"}</div>
        </div>
      </div>
    </Link>
  );
};
export default ChatItem;
