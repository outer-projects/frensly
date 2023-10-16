import style from "./ponds.module.scss";
import explore from "../explore/explore.module.scss";
import profile from "../profile/profile.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import ChatItem from "./chats/chatItem";
import TypesList from "../common/typesList";
import OneActivity from "../notifications/oneActivity";
import { IProfile } from "../../types/users";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";
import { fromWeiToEth } from "../../utils/utilities";
import { useRouter } from "next/router";
import FinanceRow from "../finance/financeRow";
const types = ["My Ponds", "My Activity", "My Holders", "My Holdings"];
const Ponds = observer(() => {
  const [active, setActive] = useState(0);
  const { user } = useInjection(Web3Store);
  const [outline, setOutline] = useState(false);
  const {
    portfolioValue,
    getHolders,
    getShares,
    shares,
    holders,
    history,
    getHistory,
    getMyChats,
    myChats
  } = useInjection(UserStore);
  useEffect(() => {
    if (user) {
      getHolders(user._id as string);
      getShares(user._id as string);
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
                  key={el.owner._id}
                  el={el.owner}
                  amount={'1000000'}
                />
              );
            })}
          </div>
        )}
        {active == 1 && (
          <div className={style.ponds__chat}>
            {history?.map((el) => {
              console.log(el);
              return <OneActivity key={el._id} activity={el} />;
            })}
          </div>
        )}
        {active == 2 && (
          <div className={style.ponds__chat}>
            {holders?.map((el) => {
              console.log(el);
              return (
                <FinanceRow key={el.user._id} el={el.user} amount={el.amount} />
              );
              // return <></>;
            })}
          </div>
        )}
        {active == 3 && (
          <div className={style.ponds__chat}>
            {shares?.map((el) => {
              console.log(el);
              // return <FinanceRow key={el.subject._id} el={el.subject} amount={el.amount}/>;
              return <></>;
            })}
          </div>
        )}
      </div>
    </div>
  );
});
export default Ponds;
