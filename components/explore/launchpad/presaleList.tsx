import { observer } from "mobx-react";
import { use, useEffect, useState } from "react";
import { CommunityStore } from "../../../stores/CommunityStore";
import { useInjection } from "inversify-react";
import style from "../explore.module.scss";
import PresaleListItem from "./presaleListItem";
import classNames from "classnames";
import TypesList from "../../common/typesList";
import { UserStore } from "../../../stores/UserStore";
const types = ["Upcoming", "Started", "Ended succesfully", "Failed"];
export const StatusesEnum = {
  incoming: "INCOMING",
  ongoing: "ONGOING",
  public: "PUBLIC",
  failed: "FAILED",
};

const PresaleList = observer(() => {
  const { getPresaleList, presaleList, updatePresaleList,presaleSearch } = useInjection(CommunityStore);
  const { wrapperBottom } = useInjection(UserStore);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(0);
  const getPresale = () => {
    if (active === 0) {
      getPresaleList(StatusesEnum.incoming);
    } else if (active == 1) {
      getPresaleList(StatusesEnum.ongoing);
    } else if (active == 2) {
      getPresaleList(StatusesEnum.public);
    } else if (active == 3) {
      getPresaleList(StatusesEnum.failed);
    }
  };
  const updatePresale = () => {
    if (active === 0) {
      updatePresaleList(StatusesEnum.incoming);
    } else if (active == 1) {
      updatePresaleList(StatusesEnum.ongoing);
    } else if (active == 2) {
      updatePresaleList(StatusesEnum.public);
    } else if (active == 3) {
      updatePresaleList(StatusesEnum.failed);
    }
  };
  useEffect(() => {
    getPresale();
  }, [active]);
  const [outline, setOutline] = useState(false);
  useEffect(() => {
    getPresaleList(StatusesEnum.incoming);
  }, []);
  const saveInput = () => {
    if (active === 0) {
      presaleSearch(search, StatusesEnum.incoming);
    } else if (active == 1) {
      presaleSearch(search, StatusesEnum.ongoing);
    } else if (active == 2) {
      presaleSearch(search, StatusesEnum.public);
    } else if (active == 3) {
      presaleSearch(search, StatusesEnum.failed);
    }
  };
  useEffect(() => {
    if (wrapperBottom && presaleList.length >= 20) {
      updatePresale();
    }
  }, [wrapperBottom]);
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
      <div className={style.explore__title} style={{textAlign:'center'}}>Launchpad</div>
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
          <div className={style.row__3}>Current supply</div>
          <div className={style.row__5}>Cost per share</div>
          <div className={style.row__6}>Owner</div>
          <div className={style.row__7}>Time to start</div>
          <div className={style.row__7}>Time to end</div>
          <div className={style.row__8}></div>
        </div>
        {/* <PresaleListItem/> */}
        {presaleList.map((el, i) => {
          return <PresaleListItem presale={el} key={el._id} />;
        })}
      </div>
    </div>
  );
});
export default PresaleList;
