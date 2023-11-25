import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import Web3Store from "../../stores/Web3Store";
import { useRouter } from "next/router";

const AuthPageWrap = observer(({ children }: any) => {
  const { authSummaryCheck } = useInjection(Web3Store);
  const [check, setCheck] = useState(false);
  const router = useRouter();
  console.log(authSummaryCheck);
  useEffect(() => {
    if (check) {
      checkAuth();
    }
  }, [check]);
  const checkAuth = () => {
    if (!authSummaryCheck) {
      router.push("/explore");
    }
  };
  useEffect(() => {
    let tt = setTimeout(() => {
      setCheck(true);
    }, 1000);
    return () => clearTimeout(tt);
  }, []);
  return <div>{children}</div>;
});
export default AuthPageWrap;
