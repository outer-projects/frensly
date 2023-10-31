import style from "./ponds.module.scss";
import explore from "../explore/explore.module.scss";
import { useEffect, useState } from "react";
import TypesList from "../common/typesList";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";
import { fromWeiToEth } from "../../utils/utilities";
import Chats from "./activity/chats";
import History from "./activity/history";
import Holders from "./activity/holders";
import Holdings from "./activity/holdings";
import Followers from "./activity/followers";
import Followings from "./activity/followings";

const types = [
  "Ponds",
  "Activity",
  "Holders",
  "Holdings",
  "Followers",
  "Followings",
];
const Ponds = observer(() => {
  const [sharesReady, setSharesReady] = useState(false)
  const { user } = useInjection(Web3Store);
  const { portfolioValue, myActive, setMyActive, getShares } =
    useInjection(UserStore);
  useEffect(() => {
    if (user && !sharesReady) {
      setSharesReady(true)
      getShares(user?._id as string);
    }
  }, [user]);
  return (
    <div className={style.ponds}>
      {" "}
      <div className={explore.explore__title}>{"My ponds"}</div>
      <TypesList active={myActive} setActive={setMyActive} types={types} />
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
        {myActive == 2 && user?._id && <Holders id={user._id} user={user} />}
        {myActive == 3 && user?._id && <Holdings id={user._id} />}
        {myActive == 4 && user?._id && <Followers id={user?._id} />}
        {myActive == 5 && user?._id && <Followings id={user?._id} />}
      </div>
    </div>
  );
});
export default Ponds;
