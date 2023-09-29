import { useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import style from "./wrapper.module.scss";
const Wrapper = observer(({ children }: any) => {
  const { opacity } = useInjection(UserStore);

  return (
    <div className={style.page__container}>
      <Header />
      {children}
    </div>
  );
});
export default Wrapper;
