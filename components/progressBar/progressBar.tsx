import classNames from "classnames";
import style from "./progress.module.scss";
import { useState } from "react";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
const ProgressBar = observer(() => {
  const { active } = useInjection(UserStore);
  return (
    <div className={classNames(style.progress, active == 1 && style.progress1, active == 2 && style.progress2)}>
      {Array.from({ length: 3 }).map((el, i) => {
        return (
          <div
            className={classNames(
              style.progress__part,
              active >= i && style.active
            )}
          />
        );
      })}
    </div>
  );
});
export default ProgressBar;
