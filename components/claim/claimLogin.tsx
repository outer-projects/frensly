import style from "./claim.module.scss";
import header from "../layout/header.module.scss";
import faq from "../faq/faq.module.scss";
import { innerBackend, token } from "../hooks/useTwitterOauth";
import { useState } from "react";
const ClaimLogin = () => {
  const [id, setId] = useState<any>(undefined);
  console.log(token);
  const connect = async () => {
    try {
      const res = await innerBackend.post("/oauth2/token");
      console.log(res);
      setId(res);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(id);
  return (
    <div className={style.claim__login}>
      <div className={faq.title}>Claim/Stake FREN tokens</div>
      <img src="../claim.svg" />
      <div className={style.claim__text}>
        Sign in to capitalise your FT points
      </div>
      <button className={header.connect__button} onClick={connect}>Twitter (X)</button>
    </div>
  );
};
export default ClaimLogin;
