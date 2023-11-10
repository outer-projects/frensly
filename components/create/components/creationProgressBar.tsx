import classNames from "classnames";
import style from "../create.module.scss";
import { observer } from "mobx-react";
const stages = [
  "Creation community pond",
  "Creation presale",
  "Interface management presale",
];
const CreationProgressBar = observer(({ step }: { step: number }) => {
  return (
    <div
      className={classNames(
        style.progress,
        step == 1 && style.progress1,
        step == 2 && style.progress2
      )}
    >
      {stages.map((el, i) => {
        return (
          <div className={classNames(style.progress__col, step == i && style.active__col)}>
            <div
              className={classNames(
                style.progress__part,
                step >= i && style.active
              )}
            ></div>{" "}
            {el}
          </div>
        );
      })}
    </div>
  );
});
export default CreationProgressBar;
