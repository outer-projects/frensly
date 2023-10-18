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
import Link from "next/link";
import { ChatStore } from "../../stores/ChatStore";
const Profile = observer(() => {
  const modalStore = useInjection(ModalStore);
  const { user, frensly, address } = useInjection(Web3Store);
  const { getMyChats, myChats } = useInjection(ChatStore);
  const [userChat, setUserChat] = useState<any>(undefined);
  const {
    profileUser,
    getProfileUser,
    clearProfileUser,
    follow,
    setCurrentType,
  } = useInjection(UserStore);
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [pricePerShade, setPricePerShade] = useState(0);
  const [count, setCount] = useState(0);
  const followUser = (isFollowed: boolean) => {
    follow(profileUser?._id as string, isFollowed).then((res) => {
      if (res) {
        setIsFollowed(!isFollowed);
      }
    });
  };
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
  const checkIsFollowed = () => {
    if (user?.isFollowing.includes(profileUser?._id as string)) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
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
      getMyChats();
    }
    return () => {
      clearProfileUser();
    };
  }, []);
  useEffect(() => {
    if (myChats) {
      let userChts = myChats.filter((el) => el.owner._id == profileUser?._id);
      setUserChat(userChts ? userChts[0].room : undefined);
    }
  }, [myChats]);
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
      checkIsFollowed();
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
                <a
                  href={`https://twitter.com/${profileUser?.twitterHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="../icons/twitter_black.svg"
                    style={{ marginRight: "5px" }}
                  />{" "}
                </a>
                <a
                  href={`https://twitter.com/${profileUser?.twitterHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>@{profileUser?.twitterHandle}</span>
                </a>
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
                !isFollowed ? style.profile__follow : style.profile__unfollow
              )}
              onClick={() => {
                console.log("Follow");
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
              style={{ paddingRight: "9px", borderRight: "1px solid #E2E3E2" }}
            >
              <span>{profileUser?.isFollowing?.length || 0}</span> Following
            </div>
            <div className={style.profile__text} style={{ marginLeft: "8px" }}>
              <span>{profileUser?.isFollowedBy?.length || 0}</span> Followers
            </div>
          </div>
          <div className={style.profile__stats__follow}>
            <div
              className={style.profile__text}
              style={{
                paddingRight: "9px",
                borderRight: "1px solid #E2E3E2",
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentType(0);
                router.push("../../activity/" + profileUser?.twitterId);
              }}
            >
              <span>{profileUser?.account?.myHolders?.length || 0}</span>{" "}
              Holders
            </div>

            <div
              className={style.profile__text}
              style={{ marginLeft: "8px", cursor: "pointer" }}
              onClick={() => {
                setCurrentType(1);
                router.push("../../activity/" + profileUser?.twitterId);
              }}
            >
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
            <Link href={`/activity/${profileUser?.twitterId}`}>
              <button
                className={style.profile__light__button}
                style={{ marginRight: "7px", cursor: "pointer" }}
              >
                Activity
              </button>
            </Link>
            {userChat && (
              <Link href={`/ponds/${userChat?._id}`}>
                <button className={style.profile__light__button}>Chat</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {profileUser && <TwitterFeed id={profileUser?._id} isProfile />}
    </div>
  );
});
export default Profile;
