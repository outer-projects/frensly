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
const typesUser = ["Holders", "Holdings", "Activity"];
const UserActivity = observer(() => {
  const [active, setActive] = useState(2);

  const [outline, setOutline] = useState(false);
  const {
    portfolioValue,
    profileUser,
    getProfileUser,
    getHolders,
    getShares,
    shares,
    holders,
    history,
    getHistory
  } = useInjection(UserStore);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      getProfileUser(id as string);
      getHolders(id as string);
      getShares(id as string);
      getHistory(id as string)
    }
  }, [id]);
  return (
    <div className={style.ponds}>
      {" "}
      <div className={explore.explore__title}>{"Pond info"}</div>
      <div className={style.ponds__top}>
        <div className={style.ponds__image}>
          <img src={profileUser?.avatar} />
          <div className={style.ponds__title}>{profileUser?.twitterName}</div>
        </div>
      </div>
      <TypesList active={active} setActive={setActive} types={typesUser} />
      <div
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
      </div>
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
            {holders?.map((el) => {
              return <FinanceRow key={el.user._id} el={el.user}/>;
            })}
          </div>
        )}
        {active == 1 && (
          <div className={style.ponds__chat}>
            {shares?.map((el) => {
              return <FinanceRow key={el.subject._id} el={el.subject}/>;
            })}
          </div>
        )}
        {active == 2 && (
          <div className={style.ponds__chat}>
            {history?.map((el) => {
              console.log(el);
              return <OneActivity key={el._id} activity={el}/>;
            })}
          </div>
        )}
      </div>
    </div>
  );
});
export default UserActivity;
