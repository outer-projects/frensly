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
import EthereumSvg from "../svgs/Ethereum";
import useDarkMode from "use-dark-mode";
const Profile = observer(() => {
  const modalStore = useInjection(ModalStore);
  const { user, frensly, address ,authSummaryCheck} = useInjection(Web3Store);
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
  const darkMode = useDarkMode();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [pricePerShade, setPricePerShade] = useState("0");
  const [count, setCount] = useState(0);
  const [hasYourCount, setHasYourCount] = useState(0);
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
      // console.log(res);
      setPricePerShade(res);
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
      // console.log(res);
      setCount(Number(res) / 10 ** 6);
    } catch (e) {
      console.log(e);
    }
  };
  const hasYourSharesCount = async () => {
    try {
      const res = await frensly.methods
        .sharesBalance(address, profileUser?.account?.address)
        .call();
      // console.log(res);
      setHasYourCount(Number(res) / 10 ** 6);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (user) {
      // getProfileUser(router.query.id as string);
      getMyChats();
    }
    return () => {
      clearProfileUser();
    };
  }, []);
  useEffect(() => {
    if (myChats && profileUser) {
      // console.log("myChats", myChats);
      let userChts = myChats.filter(
        (el) => el?.room?.owner?._id == profileUser?._id
      );
      // console.log(userChts[0]);
      setUserChat(
        userChts && userChts.length !== 0 ? userChts[0]?.room : undefined
      );
    }
  }, [myChats && profileUser]);
  useEffect(() => {
    if (router.query.id) {
      getProfileUser(router.query.id as string);
      checkPrice();
    }
  }, [router.query.id]);
  useEffect(() => {
    if (profileUser) {
      checkPrice();
      ownCount();
      hasYourSharesCount();
      checkIsFollowed();
    }
    if (profileUser?.twitterId == user?.twitterId) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  }, [profileUser]);
  return (
    <>
      {profileUser ? (
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
                        style={{
                          marginRight: "5px",
                          width: "24px",
                          height: "24px",
                        }}
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
                    <a
                      href={`https://basescan.org/address/${profileUser?.account?.address}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {" "}
                      {addressSlice(profileUser?.account?.address)}
                    </a>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className={classNames(style.profile__buttons, !authSummaryCheck && style.disable)}>
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
                      !isFollowed
                        ? "../../icons/Plus.svg"
                        : "../../icons/Close.svg"
                    }
                    style={{
                      filter: `invert(${
                        !isFollowed && darkMode.value ? "1" : "0"
                      })`,
                    }}
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
                Trade
              </button>
            </div>
            <div
              className={classNames(style.profile__text, style.profile__share)}
            >
              <div> {`You own ${Number(count)} share`}</div>
              {!isMyProfile && (
                <div> {`Has ${Number(hasYourCount)} of your share`}</div>
              )}
            </div>
            <div className={style.profile__stats}>
              <div className={style.profile__stats__row}>
                <div className={style.profile__stats__line}>
                  <div className={style.profile__text}>Net worth</div>
                  <div className={classNames(style.profile__text, style.black)}>
                    $
                    {Number(Number(profileUser?.account?.networth).toFixed(1))}
                  </div>
                </div>

                <div className={style.profile__stats__line__big}>
                  <div className={style.profile__text}>Per 1 share</div>
                  <div
                    className={classNames(
                      style.profile__text,
                      style.profile__balance
                    )}
                  >
                    {/* <span>
                      {getPriceInUsd(pricePerShade)}$
                    </span> */}
                    <EthereumSvg />
                    {fromWeiToEth(pricePerShade, 5)} ETH
                  </div>
                </div>
              </div>
              <div className={style.profile__stats__row}>
                <div className={style.profile__stats__line}>
                  <div className={style.profile__text}>Total value holders</div>
                  <div className={classNames(style.profile__text, style.black)}>
                    <img src="../icons/Info.svg" />
                    ${Number(Number(profileUser?.account?.holderNetworth).toFixed(1))}
                  </div>
                </div>

                <div className={style.profile__stats__line__big}>
                  <div className={style.profile__text}>Volume</div>
                  <div
                    className={classNames(
                      style.profile__text,
                      style.black,
                      style.right
                    )}
                  >
                    {/* <span>
                      {getPriceInUsd(profileUser?.account?.totalVolume)}$
                    </span> */}
                    {fromWeiToEth(profileUser?.account?.totalVolume as string)}{" "}
                    ETH
                  </div>
                </div>
              </div>
            </div>
            <div className={style.profile__stats__follows}>
              <div className={style.profile__stats__follow}>
                <div
                  className={classNames(
                    style.profile__text,
                    style.profile__text__clickable
                  )}
                  style={{
                    paddingRight: "9px",
                    borderRight: "1px solid var(--border)",
                  }}
                  onClick={() => {
                    setCurrentType(4);
                    router.push("../../activity/" + profileUser?.twitterId);
                  }}
                >
                  <span>{profileUser?.isFollowing?.length || 0}</span> Following
                </div>
                <div
                  className={classNames(
                    style.profile__text,
                    style.profile__text__clickable
                  )}
                  style={{ marginLeft: "8px" }}
                  onClick={() => {
                    setCurrentType(3);
                    router.push("../../activity/" + profileUser?.twitterId);
                  }}
                >
                  <span>{profileUser?.isFollowedBy?.length || 0}</span>{" "}
                  Followers
                </div>
              </div>
              <div className={style.profile__stats__follow}>
                <div
                  className={classNames(
                    style.profile__text,
                    style.profile__text__clickable
                  )}
                  style={{
                    paddingRight: "9px",
                    borderRight: "1px solid var(--border)",
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
                  className={classNames(
                    style.profile__text,
                    style.profile__text__clickable
                  )}
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
                          self.findIndex(
                            (t: any) => t.subject === value.subject
                          )
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
              <div className={classNames(style.profile__buttons__bottom, !authSummaryCheck && style.disable)}>
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
                    <button
                      className={style.profile__light__button}
                      style={{ cursor: "pointer" }}
                    >
                      Chat
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {profileUser && <TwitterFeed id={profileUser?._id} isProfile />}
        </div>
      ) : (
        <div className={style.profile__loading}>
          <img src="../spinner.gif" />
        </div>
      )}
    </>
  );
});
export default Profile;
