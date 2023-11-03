import { useEffect, useState } from "react";
import style from "./explore.module.scss";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ExploreStore } from "../../stores/ExploreStore";
import Link from "next/link";
import { fromWei } from "web3-utils";
import TypesList from "../common/typesList";
import ExploreRow from "./exploreRow";
import { InView } from "react-intersection-observer";
import OneActivity from "../notifications/oneActivity";
import { shortNick } from "../../utils/utilities";
const types = ["Top", "New Users", "Activity", "Top by networth", "Top by TVH"];
const Explore = observer(() => {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [outline, setOutline] = useState(false);

  const {
    getNewUsers,
    currentUserList,
    newUsersList,
    getTopUsers,
    getTopNW,
    getTopTVH,
    topNW,
    topTVH,
    searchUsers,
    updateNewUsers,
    updateGlobalActivity,
    searchResult,
    topUsersList,
    globalActivity,
    getGlobalActivity,
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
    if (active == 2) {
      getGlobalActivity();
    }
    if (active == 3) {
      getTopNW();
    }
    if (active == 4) {
      getTopTVH();
    }
  }, [active]);
  // console.log(searchResult);
  return (
    <div className={style.explore}>
      <div className={style.explore__title}>Explore</div>
      <div className={style.explore__users__wrapper}>
        <div className={style.explore__users__row}>
          {(search.length !== 0 && searchResult.length !== 0
            ? searchResult
            : topUsersList
          ).map((el, i) => {
            if (i <= 5) {
              return (
                <Link href={"/profile/" + el.twitterId}>
                  <div key={i} className={style.explore__topuser}>
                    <img src={el.avatar} />
                    {shortNick(el.twitterName, 13)}
                  </div>
                </Link>
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
        <TypesList types={types} setActive={setActive} active={active} />
      </div>
      {(active <= 1 || active == 3 || active == 4) && (
        <div className={style.explore__users__col}>
          {(currentUserList == "new"
            ? newUsersList
            : currentUserList == "topNW"
            ? topNW
            : currentUserList == "topTVH"
            ? topTVH
            : topUsersList
          )?.map((el: any, i: number) => {
            return (
              <div>
                <ExploreRow
                  el={el}
                  key={i}
                  isNw={
                    currentUserList == "topNW" || currentUserList == "topTVH"
                      ? true
                      : false
                  }
                />
                {currentUserList == "new" && i !== 0 && i % 19 == 0 && (
                  <InView
                    as="div"
                    triggerOnce
                    onChange={(inView, entry) => {
                      if (inView) {
                        // console.log("inview");
                        updateNewUsers();
                      }
                    }}
                  ></InView>
                )}
              </div>
            );
          })}
        </div>
      )}
      {active == 2 && (
        <div className={style.explore__users__col}>
          {globalActivity?.map((el, i) => {
            return (
              <div>
                <OneActivity activity={el} key={i} />
                {i !== 0 && i % 19 == 0 && (
                  <InView
                    as="div"
                    triggerOnce
                    onChange={(inView, entry) => {
                      if (inView) {
                        // console.log("inview");
                        updateGlobalActivity();
                      }
                    }}
                  ></InView>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
export default Explore;
