import Link from "next/link";
import explore from "../../explore/explore.module.scss";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import header from "../../layout/header.module.scss";
import style from "../create.module.scss";
import classNames from "classnames";
const WhitelistRow = observer(() => {
  return (
    // <Link href={"/profile/" + 123}>
      <div className={explore.explore__user}>
        <div className={explore.explore__user__left}>
          <img src={"123"} />
          <div className={explore.explore__user__left__text}>
            <div className={explore.explore__user__name}>
              <div>twitterName</div>
            </div>
            <div className={style.accept__name}>
              <a
                href={"https://twitter.com/"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                @witterHandleF
              </a>
            </div>
          </div>
        </div>
        <div className={style.accept__bottom}>
          {/* <div className={style.accept__share}>1 share</div> */}
          <button className={classNames(header.connect__button, style.accept__button)}>Accept</button>
        </div>
      </div>
    // </Link>
  );
});
export default WhitelistRow;
