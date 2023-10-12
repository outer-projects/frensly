import { useEffect, useState } from "react";
import style from "./explore.module.scss";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ExploreStore } from "../../stores/ExploreStore";
import Link from "next/link";
import { fromWei } from "web3-utils";
import TypesList from "../common/typesList";
import { USDEthPair } from "../../utils/utilities";
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
    if (active == 0) {
      getTopUsers();
    }
    if (active == 1) {
      getNewUsers();
    }
  }, [active]);
  console.log(searchResult);
  return (
    <div className={style.explore}>
      <div className={style.explore__title}>Explore</div>
      <div className={style.explore__users__wrapper}>
        <div className={style.explore__users__row}>
          {topUsersList.map((el, i) => {
            if (i <= 4) {
              return (
                <Link href={"/profile/" + el.twitterId}>
                  <div key={i} className={style.explore__topuser}>
                    <img src={el.avatar} />
                    {el.twitterName}
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
        {currentUserList?.map((el, i) => {
          return (
            <Link href={"/profile/" + el.twitterId}>
              <div className={style.explore__user} key={i}>
                <div className={style.explore__user__left}>
                  <img src={el.avatar} />
                  <div className={style.explore__user__left__text}>
                    <div className={style.explore__user__share}>
                      <img src="../icons/Key.svg" />
                      <div>
                        {Number(el?.account?.sharesAmount) / 10 ** 6} share
                      </div>
                    </div>
                    <div className={style.explore__user__name}>
                      {el.twitterName}
                    </div>
                  </div>
                </div>
                <div className={style.explore__user__right}>
                  <div className={style.explore__user__name}>
                    <img src="../icons/Ethereum.svg" />
                    {el.account.currentPrice} ETH
                  </div>
                  <div className={style.explore__user__balance__usd}>${USDEthPair(el.account.currentPrice)}</div>
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
