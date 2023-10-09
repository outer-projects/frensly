import style from "./profile.module.scss";
import explore from "../explore/explore.module.scss";
import header from "../layout/header.module.scss";
import classNames from "classnames";
import TwitterFeed from "./twitterFeed";
import { ModalStore } from "../../stores/ModalStore";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ModalsEnum } from "../../modals";
import Web3Store from "../../stores/Web3Store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserStore } from "../../stores/UserStore";
import { addressSlice } from "../../utils/utilities";
import { fromWei } from "web3-utils";
const Profile = observer(() => {
  const modalStore = useInjection(ModalStore);
  const { user } = useInjection(Web3Store);
  const { profileUser, getProfileUser } = useInjection(UserStore);
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);
  console.log(router);
  useEffect(() => {
    if (user) {
      getProfileUser(router.query.id as string);
    }
  }, [user]);
  useEffect(() => {
    if (profileUser?.twitterId == user?.twitterId) {
      setIsMyProfile(true);
    }
  }, [profileUser]);
  return (
    <div className={style.profile}>
      <div className={explore.explore__title}>
        {isMyProfile ? "My profile" : profileUser?.twitterName}
      </div>
      <div className={style.profile__info}>
        <div className={style.profile__row}>
          <div className={style.profile__title}>
            <img className={style.avatar} src={profileUser?.avatar} />
            <div>
              <div className={style.profile__name}>
                {profileUser?.twitterName}{" "}
                <img
                  src="../icons/twitter_black.svg"
                  style={{ marginRight: "5px" }}
                />{" "}
                <span>@{profileUser?.twitterHandle}</span>
              </div>
              <div className={style.profile__subtitle}>
                {addressSlice(profileUser?.account?.address)}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className={style.profile__buttons}>
          {!isMyProfile && (
            <button
              className={classNames(
                header.connect__button,
                style.profile__follow
              )}
              onClick={() => {
                console.log("Follow");
              }}
            >
              <img src="../../icons/Plus.svg" />
              Follow
            </button>
          )}
          <button
            className={classNames(
              header.connect__button,
              style.profile__buy,
              !isMyProfile && style.profile__half
            )}
            onClick={() =>
              modalStore.showModal(ModalsEnum.Buy, { user: profileUser })
            }
          >
            Buy
          </button>
        </div>
        <div className={classNames(style.profile__text, style.profile__share)}>
          {(isMyProfile ? "You" : profileUser?.twitterName) +
            ` own ${profileUser?.account?.othersShares.length} share`}
        </div>
        <div className={style.profile__stats}>
          <div className={style.profile__stats__row}>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>NW</div>
              <div className={classNames(style.profile__text, style.black)}>
                $??
              </div>
            </div>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>Per 1 share</div>
              <div
                className={classNames(
                  style.profile__text,
                  style.profile__balance
                )}
              >
                <img src="../icons/Ethereum.svg" />
                ?? ETH
              </div>
            </div>
          </div>
          <div className={style.profile__stats__row}>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>TVH</div>
              <div className={classNames(style.profile__text, style.black)}>
                <img src="../icons/Info.svg" />
                $??
              </div>
            </div>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>Volume</div>
              <div className={classNames(style.profile__text, style.black)}>
                {fromWei(Number(profileUser?.account?.totalVolume), "szabo")}{" "}
                ETH
              </div>
            </div>
          </div>
        </div>
        <div className={style.profile__stats__follows}>
          <div className={style.profile__stats__follow}>
            <div
              className={style.profile__text}
              style={{ marginRight: "17px" }}
            >
              <span>{profileUser?.isFollowedBy?.length}</span> Following
            </div>
            <div className={style.profile__text}>
              <span>{profileUser?.isFollowing?.length}</span> Followers
            </div>
          </div>
          <div className={style.profile__stats__follow}>
            <div
              className={style.profile__text}
              style={{ marginRight: "17px" }}
            >
              <span>115</span> Holders
            </div>
            <div className={style.profile__text}>
              <span>{profileUser?.account?.othersShares.length}</span> Holding
            </div>
          </div>
        </div>
        <div className={style.profile__bottom}>
          <div className={style.profile__types}>
            <div
              className={classNames(
                style.profile__type,
                style.profile__type__active
              )}
            >
              Posts
            </div>
          </div>
          <div className={style.profile__buttons}>
            <button
              className={style.profile__light__button}
              style={{ marginRight: "7px" }}
            >
              Activity
            </button>
            <button className={style.profile__light__button}>Chat</button>
          </div>
        </div>
      </div>
      <TwitterFeed />
    </div>
  );
});
export default Profile;
