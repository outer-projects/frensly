import { useEffect } from "react";
import Header from "./header";
import { observer } from "mobx-react";
import style from "./wrapper.module.scss";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import axios, { AxiosRequestConfig } from "axios";

const Wrapper = observer(({ children }: any) => {
  const userStore = useInjection(UserStore);
  const { setUser, user } = useInjection(UserStore);
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
      {!userStore.user && <Header />}
      {children}
    </div>
  );
});
export default Wrapper;
