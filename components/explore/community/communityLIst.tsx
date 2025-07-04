import { useEffect, useState } from "react";
import style from "../explore.module.scss";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import TypesList from "../../common/typesList";
import { CommunityStore } from "../../../stores/CommunityStore";
import CommunityRow from "./communityRow";
import { UserStore } from "../../../stores/UserStore";
const types = ["Top", "New Communities"];
const CommunityList = observer(() => {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [outline, setOutline] = useState(false);
  const { wrapperBottom } = useInjection(UserStore);
  const {
    communityList,
    getCommunityList,
    updateCommunityList,
    communitySearch,
    getTop,
  } = useInjection(CommunityStore);
  const saveInput = () => {
    console.log("asd");
    communitySearch(search);
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
    if (active == 0) {
      // setSearch("")
      getTop();
      console.log("top");
    } else {
      console.log("get");
      getCommunityList();
    }
  }, [active]);
  useEffect(() => {
    if (wrapperBottom && communityList.length >= 20 && active == 1) {
      console.log("update");
      updateCommunityList();
    }
  }, [wrapperBottom]);
  useEffect(() => {
    if (search.length !== 0) {
      console.log(search);
      searchDeb(saveInput, 700);
    }
  }, [search]);
  return (
    <div className={style.explore}>
      <div className={style.explore__title}>Explore</div>
      <div className={style.explore__users__wrapper}>
        {/* <div className={style.explore__users__row}>
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
        </div> */}
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
        {communityList?.map((el: any, i: number) => {
          return (
            <div key={el._id}>
              <CommunityRow el={el}  />
              {/* {currentUserList == "new" && i !== 0 && i % 19 == 0 && (
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
                )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
});
export default CommunityList;
