import Link from "next/link";
import style from "../explore/explore.module.scss";
import { useEffect, useState } from "react";
import { fromWeiToEth, shortNick } from "../../utils/utilities";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/Web3Store";

const CommunityRow = observer(({ el }: { el: any }) => {
  return (
    <Link href={"/communities/" + el.handle}>
      <div className={style.explore__user} style={{marginLeft:'24px', marginRight:"24px"}}>
        <div className={style.explore__user__left}>
          <img src={el.avatar} />
          <div className={style.explore__user__left__text}>
            
            <div className={style.explore__user__name}>
              <div>
                {shortNick(el.name)}123 
              </div>
              <span>
                <a
                  href={"https://twitter.com/" + el.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Owner
                </a>
              </span>
            </div>
            <div>@{el.twitter}123</div>
          </div>

        </div>
        <div className={style.explore__user__right}>
          <div className={style.explore__user__price}>
            <div>{Number(el?.supply) / 10 ** 6} share</div>
          </div>
        </div>
      </div>
    </Link>
  );
});
export default CommunityRow;
