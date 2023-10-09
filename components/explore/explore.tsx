import { useEffect, useState } from "react";
import style from "./explore.module.scss";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ExploreStore } from "../../stores/ExploreStore";
const types = ["Top", "New Users", "Trending"];
const Explore = observer(() => {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [outline, setOutline] = useState(false);
  const { getNewUsers, currentUserList, getTopUsers, searchUsers } =
    useInjection(ExploreStore);
  const saveInput = ()=> {
    searchUsers(search)
  }
  const [tt, updateTimeout] = useState<any>(undefined);
  const searchDeb = (fn: any, ms: number) => {
    const clear = () => {
      clearTimeout(tt);
      updateTimeout(setTimeout(fn, ms));
    };
    return clear();
  };

  useEffect(() => {
    searchDeb(saveInput, 700);
  }, [search]);
  useEffect(() => {
    if (active == 0) {
      getTopUsers();
    }
    if (active == 1) {
      getNewUsers();
    }
  }, [active]);
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
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
        {currentUserList?.map((el, i) => {
          console.log(el);
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
                  <img src="../icons/Ethereum.svg" />
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
});
export default Explore;
