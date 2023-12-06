import useDarkMode from "use-dark-mode";
import style from "./community.module.scss";
import stage__style from "../create/create.module.scss";
import header from "../layout/header.module.scss";
import buy from "../../modals/buy.module.scss";
import { use, useEffect, useState } from "react";
import classNames from "classnames";
import SubscriptionProgressBar from "./subscriptionProgressBar";
import { useInjection } from "inversify-react";
import { CommunityStore } from "../../stores/CommunityStore";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { fromWeiToEth } from "../../utils/utilities";
import Web3Store from "../../stores/Web3Store";
import { ModalStore } from "../../stores/ModalStore";
import { ModalsEnum } from "../../modals";
import TwitterFeed from "../profile/twitterFeed";
import { FeedStore } from "../../stores/FeedStore";
import TypesList from "../common/typesList";
import HoldersRow from "./holdersRow";
import Link from "next/link";
import OneActivity from "../notifications/oneActivity";
export const socials = [
  {
    name: "twitter",
    icon: "../../icons/X.svg",
    link: "https://twitter.com/",
  },
  {
    name: "discord",
    icon: "../../icons/discord.svg",
    link: "https://discord.com/",
  },
  {
    name: "telegram",
    icon: "../../icons/telegram.svg",
    link: "https://t.me/",
  },
  {
    name: "url",
    icon: "../../icons/web.svg",
    link: "",
  },
];
const types = ["Feed", "Activity", "Holders"];
const Community = observer(() => {
  const router = useRouter();
  const { id } = router.query;
  const [myAmount, setMyAmount] = useState(0);
  const [isHolder, setIsHolder] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [activeFeed, setActiveFeed] = useState(0);
  const { user } = useInjection(Web3Store);
  const { getCommunityPosts } = useInjection(FeedStore);
  const {
    getCommunity,
    currentCommunity,
    getHolders,
    communityHolders,
    getHistory,
    communityHistory,
  } = useInjection(CommunityStore);
  useEffect(() => {
    if (currentCommunity) {
      if (
        currentCommunity.creator.profile.twitterHandle == user?.twitterHandle
      ) {
        setIsOwner(true);
      }
    }
  }, [currentCommunity]);
  const { showModal } = useInjection(ModalStore);
  useEffect(() => {
    if (id) {
      getCommunity(id as string);
      getHistory(id as string);
      getHolders(id as string);
      getCommunityPosts(id as string);
    }
  }, [id]);
  useEffect(() => {
    setIsHolder(
      communityHolders.filter(
        (holder) =>
          holder?.user.profile?.twitterHandle == user?.twitterHandle &&
          Number(holder?.amount) >= 1000000
      ).length > 0
    );
    setMyAmount(
      communityHolders.filter(
        (holder) => holder?.user.profile?.twitterHandle == user?.twitterHandle
      )[0]?.amount
    );
  }, [communityHolders]);
  console.log(communityHolders);
  const buyShares = () => {
    showModal(ModalsEnum.TradeCommunity, { community: currentCommunity });
  };
  console.log(communityHolders);
  return (
    <div className={style.configuration}>
      <div className={style.first__block}>
        {/* <div className={style.configuration__top}>
          <div className={style.configuration__back}>
            <img
              src={"../../icons/arrow_back.svg"}
              style={{
                marginRight: "8px",
                filter: `invert(${darkMode.value ? "1" : "0"})`,
              }}
            />
            <div>back</div>
          </div>

          <img src="../Avatar.svg" />
          <div className={style.configuration__top__title}>Community name</div>
        </div> */}
        <div className={style.configuration__wrapper}>
          <div className={style.configuration__info}>
            <div className={style.configuration__user}>
              {currentCommunity?.cover ? (
                <img
                  src={currentCommunity?.cover}
                  className={style.configuration__user__cover}
                />
              ) : (
                <div className={stage__style.configuration__cover}>
                  {/* <div className={stage__style.configuration__cover__title}>
                    Cover
                  </div>
                  <div className={stage__style.configuration__size}>
                    Recommended size 1920x648{" "}
                  </div> */}
                </div>
              )}
              <div className={style.configuration__user__items}>
                <div className={style.configuration__user__name}>
                  <img src={currentCommunity?.preview} />
                  <div>{currentCommunity?.name}</div>
                </div>
                <div className={style.configuration__user__socials}>
                  {currentCommunity && socials.map((social, i) => {
                    let link = currentCommunity
                      ? social.link + currentCommunity[social.name]
                      : "";
                    if (currentCommunity[social.name] == undefined)
                      return null;
                    return (
                      <a
                        href={
                          link.includes("https://") ? link : "https://" + link
                        }
                        target="_blank"
                        key={i}
                      >
                        <div
                          style={{
                            cursor: "pointer",
                            filter: "brightness(0%)",
                          }}
                          className={style.configuration__user__social}
                        >
                          <img src={social.icon} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={style.configuration__text}>
              {currentCommunity?.description}
            </div>
          </div>
          <div className={style.configuration__col}>
            <div className={style.configuration__row}>
              <div
                className={classNames(
                  style.configuration__row__inside,
                  style.configuration__top
                )}
              >
                <div className={style.configuration__row__title}>
                  Shares supply
                </div>
                <div className={style.configuration__row__value}>
                  {Number(currentCommunity?.supply) / 10 ** 6}
                </div>
              </div>
              <div
                className={classNames(
                  style.configuration__row__inside,
                  style.configuration__top
                )}
              >
                <div className={style.configuration__row__title}>My shares</div>
                <div className={style.configuration__row__value}>
                  {myAmount ? Number(myAmount) / 10 ** 6 : 0}
                </div>
              </div>
            </div>
            <div className={style.configuration__row}>
              <div className={style.configuration__row__inside}>
                <div className={style.configuration__row__title}>Holders</div>
                <div className={style.configuration__row__value}>
                  {communityHolders?.length}
                </div>
              </div>
              <div className={style.configuration__row__inside}>
                <div className={style.configuration__row__title}>Volume</div>
                <div className={style.configuration__row__value}>
                  {fromWeiToEth(currentCommunity?.totalVolume)} ETH
                </div>
              </div>
            </div>
            <div className={style.configuration__row}>
              <div
                className={classNames(
                  style.configuration__row__inside,
                  style.configuration__bottom
                )}
              >
                <div className={style.configuration__row__title}>TVH</div>
                <div className={style.configuration__row__value}>
                  {currentCommunity?.tvh} $
                </div>
              </div>
              <div
                className={classNames(
                  style.configuration__row__inside,
                  style.configuration__bottom
                )}
              >
                <div className={style.configuration__row__title}>Creator</div>
                <div className={style.configuration__row__value}>
                  <Link
                    href={
                      "/profile/" +
                      currentCommunity?.creator?.profile?.twitterHandle
                    }
                  >
                    @{currentCommunity?.creator?.profile?.twitterHandle}
                  </Link>
                </div>
              </div>
            </div>
            <div className={style.configuration__row}>
              <div
                className={classNames(
                  style.configuration__row__inside,
                  style.configuration__last
                )}
              >
                <div className={style.configuration__row__title}>Price</div>
                <div className={style.configuration__row__value}>
                  {fromWeiToEth(currentCommunity?.price)} ETH
                </div>
              </div>
              <div
                className={classNames(
                  style.configuration__row__inside,
                  style.configuration__last
                )}
              >
                <div className={style.configuration__row__title}>Marketcap</div>
                <div className={style.configuration__row__value}>
                  {fromWeiToEth(
                    (
                      Number(currentCommunity?.price) *
                      (Number(currentCommunity?.supply) / 10 ** 6)
                    ).toString()
                  )}{" "}
                  ETH
                </div>
              </div>
            </div>
          </div>
          <div className={style.configuration__buttons}>
            {/* {authSummaryCheck && ( */}
            {isHolder &&<Link
              href={`/ponds/${currentCommunity?.chat}`}
              style={{ width: "40%" }}
            >
              <button
                className={classNames(
                  header.connect__button,
                  style.chat__button
                )}
                style={{width:'100%'}}
                // onClick={() => {
                //   router.push(`/ponds/${currentCommunity?._id}`);
                // }}
              >
                Chat
              </button>
            </Link>}
            {/* )} */}
            {/* {authSummaryCheck && ( */}
            <button
              className={classNames(
                header.connect__button,
                style.trade__button
              )}
              style={{ width: isHolder ? "40%" : "100%" }}
              onClick={buyShares}
            >
              Trade
            </button>
            {/* )} */}
          </div>
          <div className={style.configuration__type}>
            <TypesList
              types={types}
              active={activeFeed}
              setActive={setActiveFeed}
            />
          </div>
          {activeFeed == 0 &&
            (isHolder ? (
              <TwitterFeed
                communityHandle={currentCommunity?.handle}
                pondId={currentCommunity?.pondId}
                isOwner={isOwner}
              />
            ) : (
              <div className={style.configuration__hide}>
                Became a holder to see community feed
              </div>
            ))}
          {activeFeed == 1 && (
            <div className={style.configuration__holders}>
              {communityHistory.map((history, i) => {
                console.log(history);
                return <OneActivity activity={history} key={history._id} />;
              })}
            </div>
          )}
          {activeFeed == 2 && (
            <div className={style.configuration__holders}>
              {communityHolders.map((holder, i) => {
                // return <div key={i}>{}</div>;
                console.log(holder);
                return (
                  <HoldersRow
                    key={i}
                    amount={holder.amount}
                    user={holder.user.profile}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* <div className={style.second__block}>
        <div className={style.second__block__top}>
          <div className={style.subscription}>Subscription Starts</div>
          <div className={style.time}>
            <span>01</span>
            <span>01</span>
            <span>01</span>
            <span>01</span>
          </div>
          <SubscriptionProgressBar progress={20} />
          <div className={buy.buy__amount} style={{ margin: "0px" }}>
            <div className={buy.buy__amount__title}>Amount (max: 0 BNB)</div>
            <div className={buy.buy__amount__input}>
              <input
                className={buy.buy__amount__value}
                value={numberOfShares}
                type="text"
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value)) || e.target.value == ".") {
                    setNumberOfShares(e.target.value);
                  } else if (e.target.value == "") {
                    setNumberOfShares("");
                  }
                }}
              />
              <button className={style.max__button}>max</button>
            </div>
          </div>
          <div
            className={classNames(
              header.connect__button,
              style.configuration__button
            )}
          >
            Connect wallet
          </div>
        </div>
        <div className={style.configuration__col__second}>
          <div className={style.configuration__row}>
            <div className={style.configuration__row__title}>
              Community shares name
            </div>
            <div className={style.configuration__row__value}>0xFrog</div>
          </div>
          <div className={style.configuration__row}>
            <div className={style.configuration__row__title}>
              Community shares name
            </div>
            <div className={style.configuration__row__value}>0xFrog</div>
          </div>
          <div className={style.configuration__row}>
            <div className={style.configuration__row__title}>
              Community shares name
            </div>
            <div className={style.configuration__row__value}>0xFrog</div>
          </div>
        </div>
      </div> */}
    </div>
  );
});
export default Community;
