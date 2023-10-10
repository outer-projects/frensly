import classNames from "classnames";
import style from "./progress.module.scss";
import { useState } from "react";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
const ProgressBar = observer(() => {
  return (
    <div className={classNames(style.progress)}>
      {Array.from({ length: 3 }).map((el, i) => {
        return (
          <div
            className={classNames(style.progress__part, i == 0 && style.active)}
          />
        );
      })}
    </div>
  );
});
export default ProgressBar;
