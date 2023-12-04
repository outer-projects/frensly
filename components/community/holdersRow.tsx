import explore from "../explore/explore.module.scss";
import { observer } from "mobx-react";
import style from "../create/create.module.scss";
import { IProfile } from "../../types/users";

const HoldersRow = observer(
  ({ user, amount }: { user: IProfile; amount: string }) => {
    return (
      // <Link href={"/profile/" + 123}>
      <div className={explore.explore__user}>
        <div className={explore.explore__user__left}>
          <img src={user.avatar} />
          <div className={explore.explore__user__left__text}>
            <div className={explore.explore__user__name}>
              <div>{user.twitterName}</div>
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
                @{user.twitterHandle}
              </a>
            </div>
          </div>
        </div>
        <div className={style.accept__bottom}>
          <div className={style.accept__share}>
            {Number(amount) / 10 ** 6} share
          </div>
        </div>
      </div>
      // </Link>
    );
  }
);
export default HoldersRow;
