import { useState } from "react";
import style from "./airdrop.module.scss";
import header from "../../components/layout/header.module.scss";
import classNames from "classnames";
import { isAddress } from "web3-validator";
import { toast } from "react-toastify";
import axios from "axios";
import Twitter from "./twitter";
import Discord from "./discord";
import Telegram from "./telegram";
const socials = [
  { link: "https://twitter.com/frenslytech", logo: <Twitter/> },
  { link: "https://twitter.com/frenslytech", logo: <Discord/> },
  { link: "https://twitter.com/frenslytech", logo: <Telegram/> },
];
const AirdropBanner = () => {
  const [address, setAddress] = useState("");
  const [points, setPoints] = useState(0);
  const checkAddress = async () => {
    if (!isAddress(address)) return toast.error("Address is not valid");
    try {
      const res = await axios.get(
        "https://prod-api.kosetto.com/points/" + address
      );
      console.log(res.data.totalPoints);
      if (res?.data?.totalPoints) {
        setPoints(res.data.totalPoints);
      } else {
        toast.error("This address is not included in the airdrop");
      }
    } catch (e) {
      console.log(e);
      return toast.error("Server error");
    }
  };
  return (
    <div className={style.airdrop}>
      <div className={style.airdrop__title}>$FREN Airdrop</div>
      <img className={style.airdrop__image} src="../airdrop.png" />
      <img className={style.airdrop__image__mob} src="../airdrop__mob.png" />
      <div className={style.airdrop__text}>
        Stake $FREN tokens without claiming them and enjoy juicy APY, rewards
        from the trading fees, and Friday $FREN airdrops which reflect your
        current friend.tech points. Once you claim your FREN tokens, you will no
        longer be eligible for FREN airdrops.{" "}
      </div>
      <input
        className={style.airdrop__input}
        placeholder="Enter your BASE address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        value={address}
      />
      {points == 0 ? (
        <button
          className={classNames(header.connect__button, style.airdrop__button)}
          onClick={checkAddress}
        >
          Check eligibility
        </button>
      ) : (
        <div className={style.airdrop__soon}>
          <div className={style.airdrop__title}>
            Your Airdrop: <span>{points} FREN</span>
          </div>
          <button
            className={classNames(
              header.connect__button,
              style.airdrop__button__disabled
            )}
          >
            Claim comming soon
          </button>
          <div className={style.airdrop__text} style={{marginBottom:'8px',marginTop:'54px'}}>
            Follow us to keep up with the news
          </div>
          <div className={style.airdrop__socials}>
            {socials.map((el, i) => {
              return <a href={el.link} target="_blank" className={style.airdrop__media} key={i}>{el.logo}</a>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default AirdropBanner;
