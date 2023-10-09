import style from "./ponds.module.scss";
import explore from "../explore/explore.module.scss";
import profile from "../profile/profile.module.scss";
import classNames from "classnames";
import { useState } from "react";
import ChatItem from "./chats/chatItem";
import TypesList from "../common/typesList";
const types = ["My ponds", "My activity", "My holders", "My holdings"];
const Ponds = () => {
  const [active, setActive] = useState(0);
  const [outline, setOutline] = useState(false);
  return (
    <div className={style.ponds}>
      {" "}
      <div className={explore.explore__title}>My ponds</div>
      <TypesList active={active} setActive={setActive} types={types}/>
      <div
        className={classNames(
          explore.explore__search,
          style.ponds__search,
          outline && explore.explore__search__active
        )}
      >
        <img src="../icons/Search.svg" />
        <input
          placeholder="Search"
          onBlur={() => {
            setOutline(false);
          }}
          onFocus={() => {
            setOutline(true);
          }}
        />
      </div>
      <div>
        <div className={style.ponds__total}>
          <div className={style.ponds__total__text}>Total shares</div>
          <div className={style.ponds__total__value}>
            <img
              src="../icons/Ethereum.svg"
              style={{ width: "24px", height: "24px" }}
            />
            0.0121 ETH
          </div>
        </div>
      </div>
      <div className={style.ponds__chat}>
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
};
export default Ponds;
