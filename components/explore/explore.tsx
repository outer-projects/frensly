import { useState } from "react";
import style from "./explore.module.scss";
import classNames from "classnames";
const types = ["Top", "New Users", "Trending"];
const Explore = () => {
  const [active, setActive] = useState(0);
  const [outline, setOutline] = useState(false);
  return (
    <div className={style.explore}>
      <div className={style.explore__title}>Explore</div>
      <div className={style.explore__users__wrapper}>
        <img className={style.explore__swipe} src="../icons/swipe.svg" />
        <div className={style.explore__users__row}>
          {Array.from({ length: 10 }).map((el, i) => {
            return (
              <div className={style.explore__topuser}>
                <img src="../icons/AvatarBlue.svg" />
                John
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={classNames(
          style.explore__search,
          outline && style.explore__search__active
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
      <div className={style.explore__types__row}>
        {types.map((el, i) => {
          return (
            <div
              className={classNames(
                style.explore__type,
                active == i && style.explore__active
              )}
              onClick={() => {
                setActive(i);
              }}
              key={i}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className={style.explore__users__col}>
        {Array.from({ length: 10 }).map((el, i) => {
          return (
            <div className={style.explore__user} key={i}>
              <div className={style.explore__user__left}>
                <img src="../icons/AvatarBlue.svg" />
                <div className={style.explore__user__left__text}>
                  <div className={style.explore__user__share}>
                    <img src="../icons/Key.svg" />
                    <div>2.41 share</div>
                  </div>
                  <div className={style.explore__user__name}>UserName</div>
                </div>
              </div>
              <div className={style.explore__user__right}>
                <div className={style.explore__user__name}>
                  <img src="../icons/Etherium.svg" />
                  15,34 ETH
                </div>
                <div className={style.explore__user__balance__usd}>$14000</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Explore;
