import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { CommunityStore } from "../../../stores/CommunityStore";
import { useInjection } from "inversify-react";
import style from "../explore.module.scss";
import PresaleListItem from "./presaleListItem";
import classNames from "classnames";
import TypesList from "../../common/typesList";
const types = ["Upcoming", "Ended"];
const PresaleList = observer(() => {
  const { getPresaleList, presaleList } = useInjection(CommunityStore);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(0);
  const [outline, setOutline] = useState(false);
  useEffect(() => {
    getPresaleList();
  }, []);
  const saveInput = () => {
    // searchUsers(search);
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
  return (
    <div className={style.presale__list}>
      <div className={style.explore__title}>Launchpad</div>
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
      <div className={style.presale__table}>
        <div className={style.presale__table__head}>
          <div className={style.row__1}>Image</div>
          <div className={style.row__2}>Name</div>
          <div className={style.row__3}>Number of shares</div>
          <div className={style.row__4}>Hardcap</div>
          <div className={style.row__5}>Cost per share</div>
          <div className={style.row__6}>Status</div>
          <div className={style.row__7}>Time to start</div>
          <div className={style.row__8}></div>
        </div>
        <PresaleListItem/>
        {presaleList.map((el) => {
          return <PresaleListItem presale={el} />;
        })}
      </div>
    </div>
  );
});
export default PresaleList;
