import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import OneActivity from "../../notifications/oneActivity";
import Web3Store from "../../../stores/Web3Store";
import FinanceRow from "../../finance/financeRow";
import { toBNJS } from "../../../utils/utilities";
import { InView } from "react-intersection-observer";
import { IProfile } from "../../../types/users";
const Holders = observer(({ id, user }: { id: string, user:IProfile}) => {
  const { getHolders, holders, updateHolders } = useInjection(UserStore);

  useEffect(() => {
    getHolders(id as string);
  }, []);
  return (
    <div className={style.ponds__chat}>
      {holders?.map((el, i) => {
        // console.log(el);
        return (
          <>
            <FinanceRow
              key={el.user._id}
              el={el.user}
              amount={el.amount}
              price={toBNJS(user?.account.currentPrice as string)
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
                    updateHolders(id);
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
export default Holders;
