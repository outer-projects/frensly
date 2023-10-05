import header from "../../components/layout/header.module.scss";
import Twitter from "../airdrop/twitter";
import style from "./authBanner.module.scss";
const AuthBanner = () => {
  const connect = async () => {
    window.location.href = "https://frensly.adev.co/api/v1/auth/twitter";
  };
  return (
    <div className={style.banner}>
      <img src="../logo.svg" className={style.banner__logo} />
      <div className={style.banner__title}>
      Creator Economy built Onchain
      </div>
      <div>
        <div className={style.banner__join}>Join our BETA today</div>
        <div>
          <div className={style.banner__twitter}>
            <Twitter />
          </div>
          <button
            className={header.connect__button}
            onClick={connect}
            style={{ width: "286px", height: "48px" }}
          >
            Authorise
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthBanner;
