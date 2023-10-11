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
import { addressSlice, fromWeiToEth } from "../../utils/utilities";
import { fromWei } from "web3-utils";
const Profile = observer(() => {
  const modalStore = useInjection(ModalStore);
  const { user, frensly, address } = useInjection(Web3Store);
  const { profileUser, getProfileUser, clearProfileUser } =
    useInjection(UserStore);
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [pricePerShade, setPricePerShade] = useState(0);
  const [count, setCount] = useState(0);
  const checkPrice = async () => {
    try {
      const res = await frensly.methods
        .getBuyPriceAfterFee(profileUser?.account?.address, Number(1) * 10 ** 6)
        .call();
      console.log(res);
      setPricePerShade(Number(res));
    } catch (e) {
      console.log(e);
    }
  };
  const ownCount = async () => {
    try {
      const res = await frensly.methods
        .sharesBalance(profileUser?.account?.address, address)
        .call();
      console.log(res);
      setCount(Number(res) / 10 ** 6);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (user) {
      getProfileUser(router.query.id as string);
    }
    return () => {
      clearProfileUser();
    };
  }, []);
  useEffect(() => {
    if (user) {
      getProfileUser(router.query.id as string);
      checkPrice();
    }
  }, [user]);
  useEffect(() => {
    if (profileUser) {
      checkPrice();
      ownCount();
    }
    if (profileUser?.twitterId == user?.twitterId) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
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
              modalStore.showModal(ModalsEnum.Trade, { user: profileUser })
            }
          >
            Buy
          </button>
        </div>
        <div className={classNames(style.profile__text, style.profile__share)}>
          {`You own ${Number(count)} share`}
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
                {fromWeiToEth(pricePerShade, 5)} ETH
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
                {fromWeiToEth(profileUser?.account?.totalVolume as string)} ETH
              </div>
            </div>
          </div>
        </div>
        <div className={style.profile__stats__follows}>
          <div className={style.profile__stats__follow}>
            <div
              className={style.profile__text}
              style={{ paddingRight: "9px", borderRight: '1px solid #E2E3E2' }}
            >
              <span>{profileUser?.isFollowedBy?.length||0}</span> Following
            </div>
            <div
              className={style.profile__text}
              style={{ marginLeft: "8px" }}
            >
              <span>{profileUser?.isFollowing?.length||0}</span> Followers
            </div>
          </div>
          <div className={style.profile__stats__follow}>
            <div
              className={style.profile__text}
              style={{ paddingRight: "9px", borderRight: '1px solid #E2E3E2' }}
            >
              <span>115</span> Holders
            </div>
            <div className={style.profile__text} style={{ marginLeft: "8px" }}>
              <span>
                {
                  profileUser?.account?.othersShares.filter(
                    (value: any, index: number, self: any) =>
                      index ===
                      self.findIndex((t: any) => t.subject === value.subject)
                  ).length
                }
              </span>{" "}
              Holding
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
          <div className={style.profile__buttons__bottom}>
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
