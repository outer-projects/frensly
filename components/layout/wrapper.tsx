import { useEffect } from "react";
import Header from "./header";
import { observer } from "mobx-react";
import style from "./wrapper.module.scss";

const Wrapper = observer(({ children }: any) => {
  return (
    <div className={style.page__container}>
      {/* <Header /> */}
      {children}
    </div>
  );
});
export default Wrapper;
