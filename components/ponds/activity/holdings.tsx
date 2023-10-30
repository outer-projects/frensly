import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import Web3Store from "../../../stores/Web3Store";
import FinanceRow from "../../finance/financeRow";
import { toBNJS } from "../../../utils/utilities";
import { InView } from "react-intersection-observer";

const Holdings = observer(({ id }: { id: string }) => {
  const { getShares, shares, updateShares } = useInjection(UserStore);
  useEffect(() => {
    getShares(id as string);
  }, []);
  return (
    <div className={style.ponds__chat}>
      {shares?.map((el, i) => {
        // console.log(el);
        return (
          <>
            <FinanceRow
              key={el.subject._id}
              el={el.subject}
              amount={el.amount}
              price={toBNJS(el?.subject?.currentPrice as string)
                .multipliedBy((Number(el.amount) / 10 ** 6).toFixed(2))
                .toFixed(0)}
            />
            {i !== 0 && i % 29 == 0 && (
              <InView
                as="div"
                triggerOnce
                onChange={(inView, entry) => {
                  if (inView) {
                    console.log("inview");
                    updateShares(id);
                  }
                }}
              ></InView>
            )}
          </>
        );
        // return <></>;
      })}
    </div>
  );
});
export default Holdings;
