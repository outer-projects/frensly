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
const socials = [
  {
    name: "Twitter",
    icon: "../../icons/X.svg",
    link: "https://twitter.com/",
  },
  {
    name: "Discord",
    icon: "../../icons/discord.svg",
    link: "https://discord.com/",
  },
  {
    name: "Telegram",
    icon: "../../icons/telegram.svg",
    link: "https://t.me/",
  },
  {
    name: "Website",
    icon: "../../icons/web.svg",
    link: "https://discord.com/",
  },
];
const Presale = observer(() => {
  const darkMode = useDarkMode();
  const router = useRouter()
  const {id} = router.query
  console.log(id);
  const { getPresale, currentPresale } = useInjection(CommunityStore);
  const [numberOfShares, setNumberOfShares] = useState("");
  console.log(currentPresale);
  useEffect(()=>{
    if(id) getPresale(id as string)
  },[id])
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

          <img src="../Avatar.svg" />
          <div className={style.configuration__top__title}>Community name</div>
        </div>
        <div className={style.configuration__wrapper}>
          <div className={style.configuration__info}>
            <div className={style.configuration__user}>
              <img
                src="../Avatar.svg"
                className={style.configuration__user__avatar}
              />
              <div className={style.configuration__user__name}>USER</div>
              <div className={style.configuration__user__socials}>
                {socials.map((social) => {
                  return (
                    <div className={style.configuration__user__social}>
                      <img src={social.icon} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.configuration__text}>
              Welcome to the world of digital art revolution! Our NFT platform
              provides a unique opportunity for creators to tokenize and
              monetize their digital artwork. By leveraging blockchain
              technology, we ensure the authenticity, ownership, and scarcity of
              each digital collectible, empowering artists and collectors alike.
              Join us in redefining the art market and embracing the limitless
              possibilities of non-fungible tokens (NFTs) 🎨💻🚀 #DigitalArt
              #NFTCommunity
            </div>
          </div>
          <div className={style.configuration__col}>
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
        </div>
      </div>
      <div className={style.second__block}>
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
      </div>
    </div>
  );
});
export default Presale;
