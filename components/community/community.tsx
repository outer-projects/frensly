import useDarkMode from "use-dark-mode";
import style from "./community.module.scss";
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
const socials = [
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
  const [isHolder, setIsHolder] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [activeFeed, setActiveFeed] = useState(0);
  const { user, authSummaryCheck } = useInjection(Web3Store);
  const { getCommunityPosts } = useInjection(FeedStore);
  const { getCommunity, currentCommunity, getHolders, communityHolders } =
    useInjection(CommunityStore);
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
              <img
                src={currentCommunity?.preview}
                className={style.configuration__user__preview}
              />
              <div className={style.configuration__user__items}>
                <div className={style.configuration__user__name}>
                  <img src={currentCommunity?.avatar} />
                  {currentCommunity?.name}
                </div>
                <div className={style.configuration__user__socials}>
                  {socials.map((social, i) => {
                    let link = currentCommunity
                      ? social.link + currentCommunity[social.name]
                      : "";
                    // if (currentCommunity[social.name] == undefined)
                    //   return null;
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
                  {currentCommunity?.handle}
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
                  @{currentCommunity?.creator?.profile?.twitterHandle}
                </div>
              </div>
            </div>
            <div className={style.configuration__row}>
              <div className={style.configuration__row__inside}>
                <div className={style.configuration__row__title}>Holders</div>
                <div className={style.configuration__row__value}>
                  {currentCommunity?.handle}
                </div>
              </div>
              <div className={style.configuration__row__inside}>
                <div className={style.configuration__row__title}>Volume</div>
                <div className={style.configuration__row__value}>
                  @{currentCommunity?.creator?.profile?.twitterHandle}
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
                  {currentCommunity?.handle}
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
                  @{currentCommunity?.creator?.profile?.twitterHandle}
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
                  {currentCommunity?.price}
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
                  @{currentCommunity?.creator?.profile?.twitterHandle}
                </div>
              </div>
            </div>
          </div>
          <div className={style.configuration__buttons}>
            {/* {authSummaryCheck && ( */}
            <button
              className={classNames(header.connect__button, style.chat__button)}
              onClick={buyShares}
            >
              Chat
            </button>
            {/* )} */}
            {/* {authSummaryCheck && ( */}
            <button
              className={classNames(
                header.connect__button,
                style.trade__button
              )}
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
          {isHolder ? (
            <TwitterFeed
              communityHandle={currentCommunity?.handle}
              pondId={currentCommunity?.pondId}
              isOwner={isOwner}
            />
          ) : (
            <div className={style.configuration__hide}>
              Became a holder to see community feed
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
