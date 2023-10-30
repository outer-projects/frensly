import style from "./ponds.module.scss";
import explore from "../explore/explore.module.scss";
import { useEffect, useState } from "react";
import TypesList from "../common/typesList";
import OneActivity from "../notifications/oneActivity";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import { fromWeiToEth, shortNick, toBNJS } from "../../utils/utilities";
import { useRouter } from "next/router";
import FinanceRow from "../finance/financeRow";
import Followers from "./activity/followers";
import Followings from "./activity/followings";
import Holders from "./activity/holders";
import Holdings from "./activity/holdings";
const typesUser = [
  "Holders",
  "Holdings",
  "Activity",
  "Followers",
  "Followings",
];
const UserActivity = observer(() => {
  const [active, setActive] = useState(2);
  const {
    portfolioValue,
    profileUser,
    getProfileUser,
    getHolders,
    getShares,
    history,
    getHistory,
    currentType,
  } = useInjection(UserStore);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (currentType !== undefined) {
      setActive(currentType);
    }
  }, [currentType]);
  useEffect(() => {
    if (id) {
      getProfileUser(id as string);
    }
  }, [id]);
  useEffect(() => {
    if (profileUser) {
      getHolders(profileUser._id as string);
      getShares(profileUser._id as string);
      getHistory(profileUser.account._id as string);
    }
  }, [profileUser]);
  return (
    <div className={style.ponds}>
      {" "}
      <div className={explore.explore__title}>{"Pond info"}</div>
      <div className={style.ponds__top}>
        <div className={style.ponds__image}>
          <img src={profileUser?.avatar} />
          <div className={style.ponds__title}>
            {shortNick(profileUser?.twitterName)}
          </div>
        </div>
      </div>
      <TypesList active={active} setActive={setActive} types={typesUser} />
      {/* <div
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
      </div> */}
      <div className={style.ponds__bottom}>
        <div>
          <div className={style.ponds__total}>
            <div className={style.ponds__total__text}>Total shares</div>
            <div className={style.ponds__total__value}>
              <img
                src="../icons/Ethereum__grey.svg"
                style={{ width: "24px", height: "24px" }}
              />
              {portfolioValue && fromWeiToEth(portfolioValue)} ETH
            </div>
          </div>
        </div>
        {active == 0 && profileUser?._id && (
          <Holders id={profileUser?._id as string} user={profileUser} />
        )}
        {active == 1 && profileUser?._id && (
          <Holdings id={profileUser?._id as string} />
        )}
        {active == 2 && (
          <div className={style.ponds__chat}>
            {history?.map((el) => {
              // console.log(el);
              return <OneActivity key={el._id} activity={el} />;
            })}
          </div>
        )}
        {active == 3 && profileUser?._id && (
          <Followers id={profileUser?._id as string} />
        )}
        {active == 4 && profileUser?._id && (
          <Followings id={profileUser?._id as string} />
        )}
      </div>
    </div>
  );
});
export default UserActivity;
