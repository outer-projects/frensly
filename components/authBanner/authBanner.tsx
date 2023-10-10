import { useInjection } from "inversify-react";
import header from "../../components/layout/header.module.scss";
import Twitter from "../socials/twitter";
import style from "./authBanner.module.scss";
import socialsCss from "../socials/socials.module.scss";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { socials } from "../socials/socials";
import { SeparatedConnect } from "../layout/separatedConnect";
import Web3Store from "../../stores/Web3Store";
import ConnectButtonCustom from "../layout/connectButtonCustom";
import ProgressBar from "../progressBar/progressBar";
import { toWei } from "web3-utils";
import { toast } from "react-toastify";
const AuthBanner = observer(() => {
  const [title, setTitle] = useState("");
  const [stage, setStage] = useState("Authorization");
  const [opacity, setOpacity] = useState(false);


  return (
    <>
      {stage !== "Connect wallet" ? (
        <div className={style.banner}>
          <img src="../logo.svg" className={style.banner__logo} />
          <div
            className={classNames(
              style.banner__title,
              stage == "Authorization"
                ? style.banner__title__auth
                : stage == "Connect"
                ? style.banner__title__connection
                : style.banner__title__connected
            )}
          >
            <img src="../banner_img.svg" className={style.banner__img} />
            {title}
          </div>
          <div className={style.banner__text}>
            {stage == "Connect" && (
              <>
                <div
                  className={classNames(
                    style.banner__join,
                    style.banner__select
                  )}
                >
                  Your wallet is your face.
                  <br /> Select the wallet that will represent your onchain
                  history.
                </div>
              </>
            )}
            {stage == "Connected" && (
              <>
                <div className={style.banner__join}>
                  To enter a pond, you need to buy your first share
                </div>
                <div
                  className={classNames(style.banner__join, style.button__buy)}
                  style={{ marginTop: "56px" }}
                >
                  Buy for 0.0001 ETH 1 share of twitter name
                </div>
              </>
            )}
            {stage == "Authorization" && (
              <div>
                
                  <button
                    className={header.connect__button}
                    style={{ width: "200px", height: "64px", backgroundColor: '#B4B4B4', cursor:'default' }}
                  >
                    <Twitter color={"black"} />
                    Authorise (soon)
                  </button>
                
              </div>
            )}

          </div>
          <ProgressBar />
          <div className={classNames(style.banner__join, style.banner__bottom)}>
            Follow us to keep up with the news
          </div>
          <div className={style.banner__whitelist}>
            <div className={socialsCss.airdrop__socials}>
              {socials.map((el, i) => {
                return (
                  <a
                    href={el.link}
                    target="_blank"
                    className={socialsCss.airdrop__media}
                    key={i}
                  >
                    {el.logo}
                  </a>
                );
              })}
            </div>{" "}
          </div>
        </div>
      ) : (
        <div className={style.banner__center}>
          <ConnectButtonCustom />
        </div>
      )}
    </>
  );
});
export default AuthBanner;
