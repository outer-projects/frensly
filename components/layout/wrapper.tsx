import { useEffect } from "react";
import Header from "./header";
import { observer } from "mobx-react";
import style from "./wrapper.module.scss";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import axios, { AxiosRequestConfig } from "axios";
import Web3Store from "../../stores/Web3Store";

const Wrapper = observer(({ children }: any) => {
  const { init, setInit, setUser, user } = useInjection(UserStore);
  const { web3, frensly, address } = useInjection(Web3Store);
  const isInit = async () => {
    try {
      const res = await frensly.methods.isSharesSubject(address).call();
      setInit(res)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (web3) {
      isInit();
    }
  }, [web3]);

  const getUser = async () => {
    try {
      const res: AxiosRequestConfig = await axios.get(
        "https://frensly.adev.co/api/v1",
        {
          withCredentials: true,
        }
      );
      setUser(res?.data?.user);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(user);
  return (
    <div className={style.page__container}>
      {init && <Header />}
      {children}
    </div>
  );
});
export default Wrapper;
