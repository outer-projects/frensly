import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import Web3Store from "../../stores/Web3Store";
import { useRouter } from "next/router";

const AuthPageWrap = observer(({ children }: any) => {
  const { authSummaryCheck } = useInjection(Web3Store);
  const router = useRouter();
  const checkAuth = () => {
    setTimeout(() => {
      if (!authSummaryCheck) {
        router.push("/explore");
      }
    }, 500);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return <div>{children}</div>;
});
export default AuthPageWrap;
