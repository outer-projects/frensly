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

const types = [
  "My Ponds",
  "My Activity",
  "My Holders",
  "My Holdings",
  // "My Followers",
  // "My Followings",
];
const Ponds = observer(() => {
  const [active, setActive] = useState(0);
  const { user } = useInjection(Web3Store);
  const {
    portfolioValue,
    getHolders,
    getShares,
    shares,
    holders,
    followers,
    followings,
    history,
    getHistory,
    getFollowers,
    getFollowings
  } = useInjection(UserStore);
  const { getMyChats, myChats } = useInjection(ChatStore);
  useEffect(() => {
    if (user) {
      getHolders(user._id as string);
      getShares(user._id as string);
      getFollowers(user._id as string);
      getFollowings(user._id as string);
      getMyChats();
      getHistory(user.account._id as string);
    }
  }, [user]);
  return (
    <div className={style.ponds}>
      {" "}
      <div className={explore.explore__title}>{"My ponds"}</div>
      <TypesList active={active} setActive={setActive} types={types} />
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
        {active == 0 && (
          <div className={style.ponds__chat}>
            {myChats?.map((el) => {
              return (
                <ChatItem
                  messages={el.room.messages}
                  key={el.room.owner._id}
                  chatId={el.room._id}
                  el={el.room.owner}
                  amount={el.ownerShareAmount}
                />
              );
            })}
          </div>
        )}
        {active == 1 && (
          <div className={style.ponds__chat}>
            {history?.map((el) => {
              // console.log(el);
              return <OneActivity key={el._id} activity={el} />;
            })}
          </div>
        )}
        {active == 2 && (
          <div className={style.ponds__chat}>
            {holders?.map((el) => {
              // console.log(el);
              return (
                <FinanceRow
                  key={el.user._id}
                  el={el.user}
                  amount={el.amount}
                  price={
                    Number((Number(el.amount) / 10 ** 6).toFixed(2)) *
                    Number(user?.account.currentPrice)
                  }
                />
              );
              // return <></>;
            })}
          </div>
        )}
        {active == 3 && (
          <div className={style.ponds__chat}>
            {shares?.map((el) => {
              // console.log(el);
              return (
                <FinanceRow
                  key={el.subject._id}
                  el={el.subject}
                  amount={el.amount}
                  price={
                    Number((Number(el.amount) / 10 ** 6).toFixed(2)) *
                    Number(el.subject.currentPrice)
                  }
                />
              );
              // return <></>;
            })}
          </div>
        )}
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
