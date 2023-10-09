import { useEffect, useState } from "react";
import style from "./explore.module.scss";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ExploreStore } from "../../stores/ExploreStore";
import Link from "next/link";
import { fromWei } from "web3-utils";
const types = ["Top", "New Users", "Trending"];
const Explore = observer(() => {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [outline, setOutline] = useState(false);
  const {
    getNewUsers,
    currentUserList,
    getTopUsers,
    searchUsers,
    searchResult,
  } = useInjection(ExploreStore);
  const saveInput = () => {
    searchUsers(search);
  };
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
  console.log(searchResult)
  return (
    <div className={style.explore}>
      <div className={style.explore__title}>Explore</div>
      <div className={style.explore__users__wrapper}>
        
        <div className={style.explore__users__row}>
          {searchResult.map((el, i) => {
            if (i <= 4) {
              return (
                <div key={i} className={style.explore__topuser}>
                  <img src={el.avatar} />
                  {el.twitterName}
                </div>
              );
            }
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
            <Link href={'/profile/'+el.twitterId}>
            <div className={style.explore__user} key={i}>
              <div className={style.explore__user__left}>
                <img src={el.avatar} />
                <div className={style.explore__user__left__text}>
                  <div className={style.explore__user__share}>
                    <img src="../icons/Key.svg" />
                    <div>{(Number(el?.account?.sharesAmount))/(10 ** 6)} share</div>
                  </div>
                  <div className={style.explore__user__name}>
                    {el.twitterName}
                  </div>
                </div>
              </div>
              <div className={style.explore__user__right}>
                <div className={style.explore__user__name}>
                  <img src="../icons/Ethereum.svg" />
                  {Number(Number(fromWei(Number(el?.account?.totalVolume), "szabo")).toFixed(5))} ETH
                </div>
                <div className={style.explore__user__balance__usd}>$0</div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
});
export default Explore;
