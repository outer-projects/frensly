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
const types = ["Top", "New Users"];
const Explore = observer(() => {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [outline, setOutline] = useState(false);

  const {
    getNewUsers,
    currentUserList,
    newUsersList,
    getTopUsers,
    searchUsers,
    searchResult,
    topUsersList,
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
    if (active == 0 && topUsersList?.length == 0) {
      getTopUsers();
    }
    if (active == 1 && newUsersList?.length == 0) {
      getNewUsers();
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
            if (i <= 4) {
              return (
                <Link href={"/profile/" + el.twitterId}>
                  <div key={i} className={style.explore__topuser}>
                    <img src={el.avatar} />
                    {el.twitterName.length > 15
                      ? el.twitterName.slice(0, 13) + "..."
                      : el.twitterName}
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
      <div className={style.explore__users__col}>
        {(currentUserList == "new" ? newUsersList : topUsersList)?.map(
          (el, i) => {
            return (
              <div>
                <ExploreRow el={el} key={i} />
                {currentUserList == "new" && i !== 0 && i % 19 == 0 && (
                  <InView
                    as="div"
                    triggerOnce
                    onChange={(inView, entry) => {
                      if (inView) {
                        console.log("inview");
                        getNewUsers();
                      }
                    }}
                  ></InView>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
});
export default Explore;
