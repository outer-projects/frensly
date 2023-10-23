import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import Web3Store from "../../../stores/Web3Store";
import FinanceRow from "../../finance/financeRow";

const Holdings = observer(() => {
  const { getShares, shares } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    getShares(user?._id as string);
  }, []);
  return (
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
              Number(user?.account.currentPrice)
            }
          />
        );
        // return <></>;
      })}
    </div>
  );
});
export default Holdings;
