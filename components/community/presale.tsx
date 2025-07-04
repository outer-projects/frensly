import useDarkMode from "use-dark-mode";
import style from "./presale.module.scss";
import header from "../layout/header.module.scss";
import buy from "../../modals/buy.module.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import SubscriptionProgressBar from "./subscriptionProgressBar";
import { useInjection } from "inversify-react";
import { CommunityStore } from "../../stores/CommunityStore";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fromWeiToEth, getDateTime, titleSlice } from "../../utils/utilities";
import Countdown from "react-countdown";
import axios from "axios";
import { prefix } from "../../utils/config";
import Web3Store from "../../stores/Web3Store";
import { set } from "store";
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
    const [priceForOne, setPriceForOne] = useState("");
    const [priceForNumber, setPriceForNumber] = useState("");
    const { id } = router.query;
    const { community, address, communityNotConnected } = useInjection(Web3Store);
    const [presaleTimeStatus, setPresaleTimeStatus] = useState("");
    const { currentPresale, requestToWl, getPresale, getWl } =
      useInjection(CommunityStore);

    const [numberOfShares, setNumberOfShares] = useState("");
    useEffect(() => {
      let int = setInterval(() => {
        getPresale(id as string);
        getWl(id as string, address as string);
      }, 60000);
      return () => {
        clearInterval(int);
      };
    }, []);
    useEffect(() => {
      if (id) {
        getPresale(id as string);
      }
      if (id && address) {
        getWl(id as string, address as string);
      }
    }, [id, address]);
    const supply = useMemo(() => {
      return (Number(currentPresale?.supply) - 1000000) / 10 ** 6;
    }, [currentPresale]);
    const maxBuy = useMemo(() => {
      let maxPossible = Number(currentPresale?.maxAllocation) / 10 ** 6;
      console.log("max possible", maxPossible);
      let tokensLeft = Number(currentPresale?.presaleGoal) / 10 ** 6 - supply;
      console.log("tokens left", tokensLeft);
      if (maxPossible < tokensLeft) {
        return maxPossible;
      } else {
        return tokensLeft;
      }
    }, [currentPresale]);
    const disable = useMemo(() => {
      return (
        Number(numberOfShares) >
          Number(currentPresale?.maxAllocation) / 10 ** 6 ||
        Number(numberOfShares) >
          Number(currentPresale?.presaleGoal) / 10 ** 6 ||
        Number(numberOfShares) < 0 ||
        Number(currentPresale?.presaleGoal) / 10 ** 6 - supply <
          Number(numberOfShares)
      );
    }, []);
    const [statusOfRequest, setStatusOfRequest] = useState("");
    useEffect(() => {
      if (community && currentPresale) {
        if (requestToWl) {
          setStatusOfRequest("sended");
        } else {
          checkIsWhitelisted();
        }
        getPrice(1000000);
      }
    }, [requestToWl, community, currentPresale]);

    const checkIsWhitelisted = async () => {
      try {
        const res = await communityNotConnected.methods
          .isPondWhitelisted(currentPresale.pondId, address)
          .call();
        if (res) {
          setStatusOfRequest("approved");
        } else {
          setStatusOfRequest("not sended");
        }

        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    const buyPresale = async () => {
      try {
        const res = await community.methods
          .presaleBuyShares(
            currentPresale.pondId,
            Number(numberOfShares) * 10 ** 6
          )
          .send({ from: address, value: priceForNumber });
        console.log(res);
        getPresale(id as string);
        if (address) {
          getWl(id as string, address as string);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const finalize = async () => {
      try {
        const res = await community.methods
          .finalizePresale(currentPresale.pondId)
          .send({ from: address });
        console.log(res);
        setTimeout(() => {
          getPresale(id as string);
          if (address) {
            getWl(id as string, address as string);
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (currentPresale) {
        if (currentPresale.status == "INCOMING") {
          setPresaleTimeStatus("not started");
        } else if (currentPresale.status == "ONGOING") {
          setPresaleTimeStatus("started");
        } else if (currentPresale.status == "FAILED") {
          setPresaleTimeStatus("failed");
        } else if (currentPresale.status == "PUBLIC") {
          setPresaleTimeStatus("public");
        } else if (currentPresale.status == "SUCCESS") {
          setPresaleTimeStatus("success");
        }
      }
    }, [currentPresale]);

    const sendRequestBuy = async () => {
      try {
        const res = await axios.post(prefix + "pond/whitelist/apply/" + id);
        console.log(res);
        setStatusOfRequest("sended");
      } catch (error) {
        console.log(error);
      }
    };
    const getPrice = async (count: number, isChangable?: boolean) => {
      console.log(count);
      try {
        const res = await communityNotConnected.methods
          .getBuyPrice(currentPresale.pondId, count)
          .call();
        if (!isChangable) {
          setPriceForOne(res);
        } else {
          setPriceForNumber(res);
        }
        console.log("171", res);
      } catch (error) {
        console.log(error);
      }
    };

    const Success = () => (
      <div>
        Finished successfully!{" "}
        <button
          className={classNames(
            header.connect__button,
            style.configuration__button
          )}
          onClick={finalize}
        >
          Finalize
        </button>
      </div>
    );
    const Fail = () => (
      <div>
        Presale failed{" "}
        <button
          className={classNames(
            header.connect__button,
            style.configuration__button
          )}
          onClick={finalize}
        >
          Finalize
        </button>
      </div>
    );
    const rendererStart = ({
      days,
      hours,
      minutes,
      seconds,
      completed,
    }: any) => {
      console.log("start:", days, hours, minutes, seconds, completed);
      if (completed && presaleTimeStatus == "not started") {
        setPresaleTimeStatus("started");
        setStatusOfRequest("not sended");
      } else {
        // Render a countdown
        return (
          <div className={style.time}>
            <span>
              {Number(days) < 10 ? "0" : ""}
              {days}
            </span>
            <span>
              {Number(hours) < 10 ? "0" : ""}
              {hours}
            </span>
            <span>
              {Number(minutes) < 10 ? "0" : ""}
              {minutes}
            </span>
            <span>
              {Number(seconds) < 10 ? "0" : ""}
              {seconds}
            </span>
          </div>
        );
      }
    };
    const rendererFinish = ({
      days,
      hours,
      minutes,
      seconds,
      completed,
    }: any) => {
      if (completed && supply >= Number(currentPresale?.presaleGoal)) {
        // Render a completed state
        setPresaleTimeStatus("public");
        // return <Completionist />;
      } else if (
        completed &&
        Date.now() > new Date(currentPresale?.presaleEnd).getTime()
      ) {
        if(address) {
          getWl(id as string, address as string)
        }
        getPresale(id as string).then(() => {
          setPresaleTimeStatus("failed");
        });
      } else {
        // Render a countdown
        return (
          <div className={style.time}>
            <span>
              {Number(days) < 10 ? "0" : ""}
              {days}
            </span>
            <span>
              {Number(hours) < 10 ? "0" : ""}
              {hours}
            </span>
            <span>
              {Number(minutes) < 10 ? "0" : ""}
              {minutes}
            </span>
            <span>
              {Number(seconds) < 10 ? "0" : ""}
              {seconds}
            </span>
          </div>
        );
      }
    };
    return (
      <div className={style.configuration}>
        <div className={style.configuration__top}>
          <div
            className={style.configuration__back}
            onClick={() => {
              router.push("../../../explore/launchpad");
            }}
          >
            <img
              src={"../../icons/arrow_back.svg"}
              style={{
                marginRight: "8px",
                filter: `invert(${darkMode.value ? "1" : "0"})`,
              }}
            />
            <div>back</div>
          </div>

          <img
            src={
              currentPresale?.preview
                ? currentPresale?.preview
                : "../Avatar.svg"
            }
          />
          <div className={style.configuration__top__title}>
            {titleSlice(currentPresale?.name)}
            {isCreator && (
              <button
                className={classNames(
                  header.connect__button,
                  style.configuration__button__wl
                )}
                onClick={() => {
                  setOpenWhitelist(true);
                }}
              >
                Check whitelist
              </button>
            )}
          </div>
        </div>
        <div className={style.configuration__bottom}>
          <div className={style.first__block}>
            <div className={style.configuration__wrapper}>
              <div className={style.configuration__info}>
                <div className={style.configuration__user}>
                  <img
                    src={currentPresale?.creator?.profile?.avatar}
                    className={style.configuration__user__avatar}
                  />
                  <div className={style.configuration__user__name}>
                    @{currentPresale?.creator?.profile?.twitterHandle}
                  </div>
                  <div className={style.configuration__user__socials}>
                    {currentPresale &&
                      socials.map((social, i) => {
                        let link = currentPresale
                          ? social.link + currentPresale[social.name]
                          : "";
                        if (currentPresale[social.name] == undefined)
                          return null;
                        return (
                          <a
                            href={
                              link.includes("https://")
                                ? link
                                : "https://" + link
                            }
                            target="_blank"
                          >
                            <div
                              key={i}
                              style={{ cursor: "pointer" }}
                              className={style.configuration__user__social}
                            >
                              <img src={social.icon} />
                            </div>
                          </a>
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
                    {currentPresale?.liquidityFee} %
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
                  <div className={style.configuration__row__title}>
                    End time
                  </div>
                  <div className={style.configuration__row__value}>
                    {getDateTime(currentPresale?.presaleEnd)}
                  </div>
                </div>
                <div className={style.configuration__row}>
                  <div className={style.configuration__row__title}>
                    Price per 1 share
                  </div>
                  <div className={style.configuration__row__value}>
                    {fromWeiToEth(priceForOne)}
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
              <div className={style.subscription}>
                {presaleTimeStatus == "started"
                  ? "Presale is finishing in"
                  : presaleTimeStatus == "not started"
                  ? "Presale is starting in"
                  : ""}
              </div>

              <div className={style.time}>
                {presaleTimeStatus == "not started" && (
                  <Countdown
                    date={new Date(currentPresale?.presaleStart)}
                    renderer={rendererStart}
                  />
                )}
                {presaleTimeStatus == "started" && (
                  <Countdown
                    date={new Date(currentPresale?.presaleEnd)}
                    renderer={rendererFinish}
                  />
                )}
                {presaleTimeStatus == "failed" &&
                  !currentPresale.isFinalized && <Fail />}
                {presaleTimeStatus == "success" && <Success />}
              </div>
              <SubscriptionProgressBar
                supply={supply}
                goal={Number(currentPresale?.presaleGoal) / 10 ** 6}
                progress={
                  Number(
                    (
                      supply /
                      (Number(currentPresale?.presaleGoal) / 10 ** 6)
                    ).toFixed(2)
                  ) * 100
                }
              />
              {presaleTimeStatus == "started" && (
                <div className={buy.buy__amount} style={{ margin: "0px" }}>
                  <div className={buy.buy__amount__title}>
                    Amount (max: {maxBuy})
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
                          getPrice(Number(e.target.value) * 10 ** 6, true);
                        } else if (e.target.value == "") {
                          setNumberOfShares("");
                        }
                      }}
                    />
                    <button
                      className={style.max__button}
                      onClick={() => {
                        setNumberOfShares(maxBuy.toString());
                        getPrice(Number(maxBuy) * 10 ** 6, true);
                      }}
                    >
                      max
                    </button>
                  </div>
                </div>
              )}
              {presaleTimeStatus == "started" && (
                <>
                  {statusOfRequest == "not sended" && (
                    <div
                      className={classNames(
                        header.connect__button,
                        style.configuration__button,
                        disable && style.configuration__button__disable
                      )}
                      onClick={sendRequestBuy}
                    >
                      REQUEST BUY
                    </div>
                  )}{" "}
                  {statusOfRequest == "sended" && (
                    <div className={style.configuration__send}>
                      REQUEST SENDED SUCCESSFULLY
                    </div>
                  )}{" "}
                  {statusOfRequest == "approved" && maxBuy !== 0 && (
                    <div className={style.configuration__buy}>
                      {/* <div className={style.configuration__send}>
                        REQUEST APPROVED
                      </div> */}
                      <div
                        className={classNames(
                          header.connect__button,
                          style.configuration__button
                        )}
                        onClick={buyPresale}
                        // style={{ marginTop: "0px" }}
                      >
                        BUY
                      </div>
                    </div>
                  )}
                </>
              )}
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
              <div className={style.configuration__row}>
                <div className={style.configuration__row__title}>
                  Max allocation
                </div>
                <div className={style.configuration__row__value}>
                  {Number(currentPresale?.maxAllocation) / 10 ** 6}
                </div>
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
      </div>
    );
  }
);
export default Presale;
