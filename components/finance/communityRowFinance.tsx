import Link from "next/link";
import style from "../explore/explore.module.scss";
import finance from "./finance.module.scss";
import { fromWeiToEth, shortNick } from "../../utils/utilities";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/Web3Store";
import classNames from "classnames";
import { useRouter } from "next/router";

const CommunityRow = observer(
  ({ el, amount, isOwner }: { el: any; amount: string; isOwner: boolean }) => {
    const router = useRouter();
    return (
      <>
        {el.handle ? (
          <Link href={"/communities/" + el.handle}>
            <div
              className={classNames(style.explore__user)}
              style={{ marginLeft: "24px", marginRight: "24px", width: "auto" }}
            >
              <div className={style.explore__user__left}>
                <img src={el.preview} />
                <div className={style.explore__user__left__text}>
                  <div className={style.explore__user__name}>
                    <div>{shortNick(el.name)}</div>
                    <span>Owner</span>
                  </div>
                  <div className={finance.finance__handle}>
                    <a
                      href={"https://twitter.com/" + el.twitter}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      @{el.handle}
                    </a>
                  </div>
                </div>
              </div>
              <div className={style.explore__user__right}>
                <div className={style.explore__user__price}>
                  <div>{Number(amount) / 10 ** 6} share</div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div
            className={classNames(
              style.explore__user,
              style.explore__user__empty
            )}
            onClick={(e) => {
              localStorage.setItem(
                "type",
                el.isPresale ? "presale" : "community"
              );
              if (isOwner) router.push("/communities/update/" + el.pondId);
            }}
          >
            Pond is not setted up yet. {isOwner ? "Click to set up." : ""}
          </div>
        )}
      </>
    );
  }
);
export default CommunityRow;
