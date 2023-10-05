import { useInjection } from "inversify-react";
import header from "../../components/layout/header.module.scss";
import Twitter from "../airdrop/twitter";
import style from "./authBanner.module.scss";
import airdrop from "../airdrop/airdrop.module.scss";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { socials } from "../airdrop/airdropBanner";
const AuthBanner = observer(() => {
  const { user } = useInjection(UserStore);
  const [isWhitelist, setWhitelist] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [stage, setStage] = useState("");
  useEffect(() => {
    if (!user) {
      setStage("Authorization");
    } else if (user && !isWhitelist) {
      setStage("Connect");
    } else if (user && isWhitelist) {
      setStage("Connected");
    }
  }, [user, isWhitelist]);
  useEffect(() => {
    switch (stage) {
      case "Authorization":
        setTitle("Creator Economy built Onchain");
        setSubTitle("Join our BETA today");
        return;
      case "Connect":
        setTitle("You are early!");
        setSubTitle("Connect your wallet to join whitelist");
        return;
      case "Connected":
        setTitle("Welcome to whitelist");
        setSubTitle(
          "We are still in development but beta is almost here. Follow us on social to keep up with the news"
        );
        return;
      default:
        return;
    }
  }, [stage]);
  const connect = async () => {
    // window.location.href = "https://frensly.adev.co/api/v1/auth/twitter";
  };
  return (
    <div className={style.banner}>
      <img src="../logo.svg" className={style.banner__logo} />
      <div
        className={classNames(
          style.banner__title,
          stage == "Authorization"
            ? style.banner__title__auth
            : stage == "Connection"
            ? style.banner__title__connection
            : style.banner__title__connected
        )}
      >
        {title}
      </div>
      <div>
        <div className={style.banner__join}>{subtitle}</div>
        {stage == "Authorization" && (
          <div>
            <div className={style.banner__twitter}>
              <Twitter />
            </div>
            <a href="https://frensly.adev.co/api/v1/auth/twitter"><button
              className={header.connect__button}
            
              style={{ width: "286px", height: "48px" }}
            >
              Authorise
            </button></a>
          </div>
        )}
        {stage == "Connect" && (
          <div className={style.banner__early}>
            <button
              className={header.connect__button}
              // onClick={connect}
              style={{ width: "286px", height: "48px" }}
            >
              Connect
            </button>
            <img src="../../bottom.png" />
          </div>
        )}
        {stage == "Connected" && (
          <div className={style.banner__whitelist}>
            <div className={airdrop.airdrop__socials}>
              {socials.map((el, i) => {
                return (
                  <a
                    href={el.link}
                    target="_blank"
                    className={airdrop.airdrop__media}
                    key={i}
                  >
                    {el.logo}
                  </a>
                );
              })}
            </div>{" "}
            <img src="../../bottom.png" />
          </div>
        )}
      </div>
    </div>
  );
});
export default AuthBanner;
