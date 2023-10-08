import style from "./ponds.module.scss";
import explore from "../explore/explore.module.scss";
import profile from "../profile/profile.module.scss";
import classNames from "classnames";
import { useState } from "react";
import ChatItem from "./chats/chatItem";
const types = ["My ponds", "My activity", "My holders", "My holdings"];
const Ponds = () => {
  const [active, setActive] = useState(0);
  const [outline, setOutline] = useState(false);
  return (
    <div className={style.ponds}>
      {" "}
      <div className={explore.explore__title}>My ponds</div>
      <div className={profile.profile__types}>
        {types.map((el, i) => (
          <div
            className={classNames(
              profile.profile__type,
              active == i && profile.profile__type__active
            )}
            onClick={() => {
              setActive(i);
            }}
          >
            {el}
          </div>
        ))}
      </div>
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
              src="../icons/Etherium.svg"
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
