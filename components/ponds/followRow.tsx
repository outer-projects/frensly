import Link from "next/link";
import { IAccount, IProfile } from "../../types/users";
import style from "../explore/explore.module.scss";
import { useEffect, useState } from "react";
import { fromWeiToEth } from "../../utils/utilities";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/Web3Store";
import classNames from "classnames";
import profile from "../profile/profile.module.scss";
import header from "../layout/header.module.scss";
const FollowRow = observer(({ el }: { el: IProfile }) => {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const { getPriceInUsd, follow } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    checkIsFollowed();

    // if (el?.twitterId == user?.twitterId) {
    //   setIsMyProfile(true);
    // } else {
    //   setIsMyProfile(false);
    // }
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
    <Link href={"/profile/" + el?.twitterId}>
      <div className={style.explore__user}>
        <div className={style.explore__user__left}>
          <img src={el?.avatar} />
          <div className={style.explore__user__left__text}>
            <div className={style.explore__user__name}>{el?.twitterName}</div>
            <div className={style.explore__user__share}>
              @{el?.twitterHandle}
            </div>
          </div>
        </div>
        <div className={style.explore__user__right}>
          {!isMyProfile && (
            <button
              className={classNames(
                header.connect__button,
                !isFollowed
                  ? style.profile__follow
                  : style.profile__unfollow
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
              />
              {!isFollowed ? "Follow" : "Unfollow"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
});
export default FollowRow;
