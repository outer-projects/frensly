import { useEffect } from "react";
import Header from "./header";
import { observer } from "mobx-react";
import style from "./wrapper.module.scss";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";

const Wrapper = observer(({ children }: any) => {
  const userStore = useInjection(UserStore)
  return (
    <div className={style.page__container}>
      {/* {!userStore.user && <Header />} */}
      {children}
    </div>
  );
});
export default Wrapper;
