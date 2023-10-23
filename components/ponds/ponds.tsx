import style from "./ponds.module.scss";
import explore from "../explore/explore.module.scss";
import { useEffect, useState } from "react";
import ChatItem from "./chats/chatItem";
import TypesList from "../common/typesList";
import OneActivity from "../notifications/oneActivity";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";
import { fromWeiToEth } from "../../utils/utilities";
import FinanceRow from "../finance/financeRow";
import { ChatStore } from "../../stores/ChatStore";
import OneNotification from "../notifications/oneNotification";
import Chats from "./activity/chats";
import History from "./activity/history";
import Holders from "./activity/holders";
import Holdings from "./activity/holdings";
import Notifications from "./activity/notifications";

const types = [
  "My Ponds",
  "My Activity",
  "My Holders",
  "My Holdings",
  "Notifications",
  // "My Followers",
  // "My Followings",
];
const Ponds = observer(() => {
  const { user } = useInjection(Web3Store);
  const {
    portfolioValue,
    myActive,
    setMyActive,
    getFollowers,
    getFollowings,
    // getAllNotifications,
  } = useInjection(UserStore);
  useEffect(() => {
    if (user) {
      getFollowers(user._id as string);
      getFollowings(user._id as string);
      // getAllNotifications();
    }
  }, [user]);
  return (
    <div className={style.ponds}>
      {" "}
      <div className={explore.explore__title}>{"My ponds"}</div>
      <TypesList active={myActive} setActive={setMyActive} types={types} />
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
        {myActive == 0 && <Chats />}
        {myActive == 1 && <History />}
        {myActive == 2 && <Holders />}
        {myActive == 3 && <Holdings />}
        {myActive == 4 && <Notifications />}
        {/* {active == 4 && (
          <div className={style.ponds__chat}>
            {followers?.map((el) => {
              console.log(el);
              return (
                <FinanceRow
                  key={el._id}
                  el={el}
                />
              );
              // return <></>;
            })}
          </div>
        )}
        {active == 5 && (
          <div className={style.ponds__chat}>
            {followings?.map((el) => {
              console.log(el);
              return (
                <FinanceRow
                  key={el._id}
                  el={el}
                />
              );
              // return <></>;
            })}
          </div>
        )} */}
      </div>
    </div>
  );
});
export default Ponds;
