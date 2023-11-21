import useDarkMode from "use-dark-mode";
import style from "./presale.module.scss";
import header from "../layout/header.module.scss";
import buy from "../../modals/buy.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";
import SubscriptionProgressBar from "./subscriptionProgressBar";
import { useInjection } from "inversify-react";
import { CommunityStore } from "../../stores/CommunityStore";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fromWeiToEth, getDateTime } from "../../utils/utilities";
import Countdown from "react-countdown";
import axios from "axios";
import { prefix } from "../../utils/config";
import Web3Store from "../../stores/Web3Store";
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
    link: "https://discord.com/",
  },
];
const Presale = observer(
  ({
    isCreator,
    setOpenWhitelist,
  }: {
    isCreator: boolean;
    setOpenWhitelist: (wl: boolean) => void;
  }) => {
    const darkMode = useDarkMode();
    const router = useRouter();
    const { id } = router.query;
    const { user } = useInjection(Web3Store);
    const { currentPresale } = useInjection(CommunityStore);
    const [numberOfShares, setNumberOfShares] = useState("");
    const [statusOfRequest, setStatusOfRequest] = useState("not sended");
    console.log(currentPresale);

    // useEffect(() => {
    //   if(currentPresale) {
    //     let total = Number(currentPresale.presalePrice) * Number(numberOfShares)
    //     setTotal()
    //   }
    // }, [currentPresale])
    const sendRequestBuy = async () => {
      try {
        const res = await axios.post(prefix + "pond//whitelist/apply/" + id);
        console.log(res);
        setStatusOfRequest("sended");
      } catch (error) {
        console.log(error);
      }
    };
    const checkRequest = async () => {
      try {
        const res = await axios.post(prefix + "pond//whitelist/apply/" + id);
        console.log(res);
        setStatusOfRequest("sended");
      } catch (error) {
        console.log(error);
      }
    };
    const Completionist = () => <div>Finished!</div>;
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <div className={style.time}>
            <span>{days}</span>
            <span>{hours}</span>
            <span>{minutes}</span>
            <span>{seconds}</span>
          </div>
        );
      }
    };
    return (
      <div className={style.configuration}>
        <div className={style.first__block}>
          <div className={style.configuration__top}>
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

            <img src={currentPresale?.image} />
            <div className={style.configuration__top__title}>
              {currentPresale?.name}
              {isCreator && (
                <button
                  className={classNames(
                    header.connect__button,
                    style.configuration__button
                  )}
                  onClick={() => {
                    setOpenWhitelist(true)
                  }}
                >
                  Check whitelist
                </button>
              )}
            </div>
          </div>
          <div className={style.configuration__wrapper}>
            <div className={style.configuration__info}>
              <div className={style.configuration__user}>
                <img
                  src={currentPresale?.creator?.profile?.avatar}
                  className={style.configuration__user__avatar}
                />
                <div className={style.configuration__user__name}>
                  {currentPresale?.creator?.profile?.twitterName}
                </div>
                <div className={style.configuration__user__socials}>
                  {socials.map((social, i) => {
                    let link = currentPresale
                      ? social.link + currentPresale[social.name]
                      : "";
                    return (
                      <Link href={link}>
                        <div
                          key={i}
                          style={{ cursor: "pointer" }}
                          className={style.configuration__user__social}
                        >
                          <img src={social.icon} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className={style.configuration__text}>
                {currentPresale?.description}
              </div>
            </div>
            <div className={style.configuration__col}>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>
                  Community shares name
                </div>
                <div className={style.configuration__row__value}>
                  {currentPresale?.handle}
                </div>
              </div>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>
                  Presale supply
                </div>
                <div className={style.configuration__row__value}>
                  {Number(currentPresale?.presaleGoal) / 10 ** 6} shares
                </div>
              </div>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>
                  Liquidity fee
                </div>
                <div className={style.configuration__row__value}>
                  {fromWeiToEth(currentPresale?.liquidityFee)} ETH
                </div>
              </div>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>
                  Start time
                </div>
                <div className={style.configuration__row__value}>
                  {getDateTime(currentPresale?.presaleStart)}
                </div>
              </div>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>End time</div>
                <div className={style.configuration__row__value}>
                  {getDateTime(currentPresale?.presaleEnd)}
                </div>
              </div>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>
                  Price per 1 share
                </div>
                <div className={style.configuration__row__value}>
                  {fromWeiToEth(currentPresale?.presalePrice)}
                </div>
              </div>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>Fee</div>
                <div className={style.configuration__row__value}>7.5%</div>
              </div>
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>Creator</div>
                <div className={style.configuration__row__value}>
                  {currentPresale?.creator?.profile?.twitterName}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.second__block}>
          <div className={style.second__block__top}>
            <div className={style.subscription}>Subscription Starts</div>
            <div className={style.time}>
              <Countdown
                date={new Date(currentPresale?.presaleEnd)}
                renderer={renderer}
              />
            </div>
            <SubscriptionProgressBar
              supply={Number(currentPresale?.supply) / 10 ** 6}
              goal={Number(currentPresale?.presaleGoal) / 10 ** 6}
              progress={Number(
                (
                  Number(currentPresale?.supply) /
                  Number(currentPresale?.presaleGoal)
                ).toFixed(0)
              )}
            />
            <div className={buy.buy__amount} style={{ margin: "0px" }}>
              <div className={buy.buy__amount__title}>
                Amount (max: {Number(currentPresale?.maxAllocation) / 10 ** 6})
              </div>
              <div className={buy.buy__amount__input}>
                <input
                  className={buy.buy__amount__value}
                  value={numberOfShares}
                  type="text"
                  onChange={(e) => {
                    if (
                      !isNaN(Number(e.target.value)) ||
                      e.target.value == "."
                    ) {
                      setNumberOfShares(e.target.value);
                    } else if (e.target.value == "") {
                      setNumberOfShares("");
                    }
                  }}
                />
                <button
                  className={style.max__button}
                  onClick={() => {
                    setNumberOfShares(
                      (
                        Number(currentPresale?.maxAllocation) /
                        10 ** 6
                      ).toString()
                    );
                  }}
                >
                  max
                </button>
              </div>
            </div>
            <div
              className={classNames(
                header.connect__button,
                style.configuration__button
              )}
              onClick={() => {
                sendRequestBuy();
              }}
            >
              REQUEST BUY
            </div>
          </div>
          <div className={style.configuration__col__second}>
            <div className={style.configuration__row}>
              <div className={style.configuration__row__title}>Status</div>
              <div className={style.configuration__row__value}>
                {currentPresale?.status}
              </div>
            </div>
            <div className={style.configuration__row}>
              <div className={style.configuration__row__title}>Sale Type</div>
              <div className={style.configuration__row__value}>Public</div>
            </div>
            {/* <div className={style.configuration__row}>
            <div className={style.configuration__row__title}>
              Community shares name
            </div>
            <div className={style.configuration__row__value}>0xFrog</div>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
);
export default Presale;
