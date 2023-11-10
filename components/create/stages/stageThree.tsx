import { observer } from "mobx-react";
import style from "../create.module.scss";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import RegupsProgressBar from "../components/regupsProgressBar";
import RegupRow from "../components/regupRow";
import classNames from "classnames";
import header from "../../layout/header.module.scss";

const StageThree = observer(({ setStep }: { setStep: (s: number) => void }) => {
  const { user } = useInjection(Web3Store);
  return (
    <div className={style.stage__one}>
      <div className={style.stage__one__user}>
        <img className={style.stage__one__user__avatar} src={user?.avatar} />
        <div className={style.stage__one__user__name}>
          {user?.twitterName} presale regups
        </div>
        <RegupsProgressBar progress={20} />
      </div>
      <div className={style.stage__three__col}>
        <RegupRow />
      </div>
      <div className={style.stage__one__buttons}>
        <button
          className={classNames(
            header.connect__button,
            style.stage__one__button
          )}
          onClick={() => setStep(2)}
        >
          Create pre-sale
        </button>
      </div>
    </div>
  );
});
export default StageThree;
