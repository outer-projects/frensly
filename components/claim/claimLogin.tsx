import style from "./claim.module.scss";
import header from "../layout/header.module.scss";
import faq from "../faq/faq.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const ClaimLogin = () => {
  const [id, setId] = useState<any>(undefined);
  const [twitterData, setTwitterData] = useState<any>(undefined);
  const router = useRouter();
  let cookieValue = document.cookie;
  // const { data, status } = useSession();

  const connect = async () => {
    window.location.href = "https://frensly.adev.co/api/v1/auth/twitter";
  };
  // useEffect(() => {
  //   if (data) {
  //     setTwitterData(data);
  //   }
  // }, [data]);
  console.log(twitterData);
  return (
    <>
      {!twitterData ? (
        <div className={style.claim__login}>
          <div className={faq.title}>Claim/Stake FREN tokens</div>
          <img src="../claim.svg" onClick={() => console.log(cookieValue)} />
          <div className={style.claim__text}>
            Sign in to capitalise your FT points
          </div>
          <button className={header.connect__button} onClick={connect}>
            Twitter (X)
          </button>
        </div>
      ) : (
        <div className={style.claim__account}>
          <div className={faq.title}>Available tokens</div>
          <div className={style.claim__tokens}>
            0 <span>$FRENS</span>
          </div>
          <div className={style.claim__row}>
            <button className={header.connect__button}>Claim</button>
            <img src={twitterData?.user?.image || "../../empty_avatar.svg"} />
            <div>{twitterData?.user?.name || "username123"}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default ClaimLogin;
