import { useEffect } from "react";
import Header from "./header";
import { observer } from "mobx-react";
import style from "./wrapper.module.scss";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import axios, { AxiosRequestConfig } from "axios";
import Web3Store from "../../stores/Web3Store";
import { toast } from "react-toastify";

const Wrapper = observer(({ children }: any) => {
  const { init, setInit } = useInjection(UserStore);
  const { web3, frensly, address, user, setUser } = useInjection(Web3Store);
  const isInit = async () => {
    console.log(address,user?.account?.address); 
    if(address?.toLowerCase()!==user?.account?.address) return toast.error('Address is not assigned to this account')
    try {
      const res = await frensly.methods.isSharesSubject(address).call();
      setInit(res)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (web3 && address && user?.account) {
      isInit();
    }
  }, [web3, address, user]);

  const getUser = async () => {
    try {
      const res: AxiosRequestConfig = await axios.get(
        "https://frensly.adev.co/api/v1/user",
        {
          withCredentials: true,
        }
      );
      setUser(res?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className={style.page__container}>
      {<Header />}
      {/* {<Header />} */}
      {children}
    </div>
  );
});
export default Wrapper;
