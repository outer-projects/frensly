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
  const { address, authStatus, frensly, user, checkAuth } =
    useInjection(Web3Store);
  const { setActive, setInit, sendInviteCode } = useInjection(UserStore);
  const [title, setTitle] = useState("");
  const [invite, setInvite] = useState("");
  const [stage, setStage] = useState("");
  const [opacity, setOpacity] = useState(false);
  const [activeCode, setActiveCode] = useState(false);

  useEffect(() => {
    if (user?.account && !address) {
      setStage("Connect wallet");
    } else if (!user) {
      setStage("Authorization");
    } else if (user && !user?.isKeyConfirmed) {
      setStage("Invite");
    } else if (user && user?.isKeyConfirmed && !user?.account) {
      setStage("Connect");
    } else if (user?.account && user?.isKeyConfirmed) {
      setStage("Connected");
    }
  }, [user, authStatus, address]);
  // console.log(user, stage, address);
  useEffect(() => {
    switch (stage) {
      case "Authorization":
        setTitle("Creator economy onchain");
        setActive(0);
        return;
      case "Connect":
        setTitle("You are early!");
        setTitle("Creator economy onchain");
        setActive(1);
        return;
      case "Invite":
        setTitle("Creator economy onchain");
        setActive(1);
        return;
      case "Connected":
        setTitle("Create my pond");
        setActive(2);
        return;
      case "Connect wallet":
        setTitle("Connect wallet");
        setActive(2);
        return;
      default:
        return;
    }
  }, [stage]);
  const postCode = () => {
    sendInviteCode(invite).then((res) => {
      if (res) {
        checkAuth();
      } else {
        toast.error("Code is not correct");
      }
    });
  };
  const init = async () => {
    if (address?.toLowerCase() !== user?.account?.address)
      return toast.error("Address is not assigned to this account");
    try {
      await frensly.methods.initShares().send({
        from: address,
      });
      const isInit = await frensly.methods.isSharesSubject(address).call();
      setInit(isInit);
    } catch (e) {
      toast.error("Provider error");
      console.log(e);
    }
  };
  useEffect(() => {
    let tt = setTimeout(() => {
      setOpacity(true);
    }, 1000);
    return () => {
      clearTimeout(tt);
    };
  }, []);
  return (
    <>
      {
        <div className={style.banner} style={{ opacity: opacity ? 1 : 0 }}>
          <img src="../logo.svg" className={style.banner__logo} />
          <div className={style.banner__col}>
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
              {stage == "Invite" && (
                <>
                  <div
                    className={classNames(
                      style.banner__join,
                      style.banner__select
                    )}
                  >
                    We are still in closed beta.
                    <br /> To join service please write your invite code
                  </div>
                </>
              )}
              {stage == "Connected" && (
                <>
                  <div
                    className={classNames(
                      style.banner__join,
                      style.banner__select
                    )}
                  >
                    To start using our app you need
                    <br /> to initialise your account first
                  </div>
                </>
              )}

              {stage == "Connect wallet" && (
                <>
                  <div className={style.banner__join}>
                    Connect wallet that linked in {user?.twitterHandle}
                  </div>
                  <div
                    className={classNames(
                      style.banner__join,
                      style.button__buy
                    )}
                    style={{ marginTop: "56px" }}
                  >
                    Buy for 0.0001 ETH 1 share of twitter name
                  </div>
                </>
              )}
              {stage == "Invite" && (
                <div className={style.banner__invite}>
                  <input
                    className={classNames(
                      style.banner__code,
                      activeCode && style.banner__code__active
                    )}
                    value={invite}
                    onFocus={() => {
                      setActiveCode(true);
                    }}
                    onBlur={() => {
                      setActiveCode(false);
                    }}
                    placeholder="Your invite code"
                    onChange={(e) => {
                      setInvite(e.target.value);
                    }}
                  />
                  <div
                    className={style.banner__post}
                    style={{
                      cursor: "pointer",
                      transform: "translateX(-16px)",
                    }}
                    onClick={postCode}
                  >
                    Enter
                  </div>
                </div>
              )}
              {stage == "Authorization" && (
                <div>
                  <a
                    href="/api/v1/auth/twitter"
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className={header.connect__button}
                      style={{ width: "200px", height: "64px" }}
                    >
                      <Twitter color={"black"} />
                      Authorise
                    </button>
                  </a>
                </div>
              )}
              <div
                className={style.banner__early}
                style={{ display: stage == "Connect" ? "flex" : "none" }}
              >
                <ConnectButtonCustom />
                <div className={style.banner__small__text}>
                  The wallet can't be changed
                </div>
              </div>
              {stage == "Connected" && (
                <div className={style.banner__early}>
                  <button
                    className={header.connect__button}
                    style={{ width: "221px", height: "64px" }}
                    onClick={() => init()}
                  >
                    Initialize
                  </button>
                </div>
              )}
              {stage == "Connect wallet" && (
                <div className={style.banner__early}>
                  <ConnectButtonCustom />
                </div>
              )}
            </div>
          </div>
          <div className={style.banner__col}>
            <ProgressBar />
            <div
              className={classNames(style.banner__join, style.banner__bottom)}
            >
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
        </div>
      }
    </>
  );
});
export default AuthBanner;
