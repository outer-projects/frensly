import style from "./claim.module.scss";
import header from "../layout/header.module.scss";
import faq from "../faq/faq.module.scss";
import { innerBackend, token } from "../hooks/useTwitterOauth";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const ClaimLogin = () => {
  const [id, setId] = useState<any>(undefined);
  const router = useRouter();
  const { data, status } = useSession();
  console.log(data, status, router.pathname);
  const connect = async () => {
    await signIn("twitter", {
      redirect: false,
      callbackUrl: `/`,
    });
  };
  console.log(id);
  return (
    <div className={style.claim__login}>
      <div className={faq.title}>Claim/Stake FREN tokens</div>
      <img src="../claim.svg" />
      <div className={style.claim__text}>
        Sign in to capitalise your FT points
      </div>
      <button className={header.connect__button} onClick={connect}>
        Twitter (X)
      </button>
    </div>
  );
};
export default ClaimLogin;
