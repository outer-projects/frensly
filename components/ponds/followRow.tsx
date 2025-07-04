import Link from "next/link";
import { IAccount, IProfile } from "../../types/users";
import style from "../explore/explore.module.scss";
import { useEffect, useState } from "react";
import { fromWeiToEth, shortNick } from "../../utils/utilities";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/Web3Store";
import classNames from "classnames";
import profile from "../profile/profile.module.scss";
import header from "../layout/header.module.scss";
import useDarkMode from "use-dark-mode";
const FollowRow = observer(({ el }: { el: IProfile }) => {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const { getPriceInUsd, follow } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  const darkMode = useDarkMode()
  useEffect(() => {
    checkIsFollowed();
  }, []);
  const checkIsFollowed = () => {
    if (user?.isFollowing.includes(el?._id as string)) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  };
  const followUser = (isFollowed: boolean) => {
    follow(el?._id as string, isFollowed).then((res) => {
      if (res) {
        setIsFollowed(!isFollowed);
      }
    });
  };
  return (
    <div className={style.explore__user}>
      <div className={style.explore__user__left}>
        <img src={el?.avatar} />
        <div className={style.explore__user__left__text}>
          <Link href={"/profile/" + el?.twitterId}>
            {" "}
            <div className={style.explore__user__name}>
              <div>{shortNick(el?.twitterName)}</div>
            </div>
          </Link>
          <div className={style.explore__user__share}>@{el?.twitterHandle}</div>
        </div>
      </div>
      <div className={style.explore__user__right}>
        {!isMyProfile && (
          <button
            className={classNames(
              header.connect__button,
              !isFollowed ? style.profile__follow : style.profile__unfollow
            )}
            onClick={() => {
              // console.log("Follow");
              followUser(isFollowed);
            }}
          >
            <img
              src={
                !isFollowed ? "../../icons/Plus.svg" : "../../icons/Close.svg"
              }
              style={{ cursor: "pointer", filter: `invert(${!isFollowed && darkMode.value ? "1" : "0"})` }}
            />
            {!isFollowed ? "Follow" : "Unfollow"}
          </button>
        )}
      </div>
    </div>
  );
});
export default FollowRow;
