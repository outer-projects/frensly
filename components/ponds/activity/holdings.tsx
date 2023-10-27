import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import Web3Store from "../../../stores/Web3Store";
import FinanceRow from "../../finance/financeRow";
import { toBNJS } from "../../../utils/utilities";

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
            price={toBNJS(el?.subject?.currentPrice as string).multipliedBy(
              Math.round(Number(el.amount) / 10 ** 6)
            )}
          />
        );
        // return <></>;
      })}
    </div>
  );
});
export default Holdings;
