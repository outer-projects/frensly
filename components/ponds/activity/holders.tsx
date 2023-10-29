import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import OneActivity from "../../notifications/oneActivity";
import Web3Store from "../../../stores/Web3Store";
import FinanceRow from "../../finance/financeRow";
import { toBNJS } from "../../../utils/utilities";
const Holders = observer(() => {
  const { getHolders, holders } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    getHolders(user?._id as string);
  }, []);
  return (
    <div className={style.ponds__chat}>
      {holders?.map((el) => {
        // console.log(el);
        return (
          <FinanceRow
            key={el.user._id}
            el={el.user}
            amount={el.amount}
            price={toBNJS(user?.account.currentPrice as string)
              .multipliedBy((Number(el.amount) / 10 ** 6).toFixed(2))
              .toFixed(0)}
          />
        );
        // return <></>;
      })}
    </div>
  );
});
export default Holders;
