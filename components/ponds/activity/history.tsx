import { observer } from "mobx-react";
import style from "../ponds.module.scss";
import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { UserStore } from "../../../stores/UserStore";
import OneActivity from "../../notifications/oneActivity";
import Web3Store from "../../../stores/Web3Store";
const History = observer(() => {
  const { getHistory, history } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    getHistory(user?.account._id as string);
  }, []);
  return (
    <div className={style.ponds__chat}>
      {history?.map((el) => {
        // console.log(el);
        return <OneActivity key={el._id} activity={el} />;
      })}
    </div>
  );
});
export default History;
