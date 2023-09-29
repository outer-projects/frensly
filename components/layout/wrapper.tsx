import { useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

const Wrapper = observer(({ children }: any) => {
  const {opacity} = useInjection(UserStore)

  return (
    <div className="container--main" >
      <div
        className="wrapper"
        style={{ backgroundImage: "url(img/background.png)" }}
      >
        <Header />
        <main className="main">
          <div className="row">
            <div className="main--wrapper">
              <div className="main--modals" style={{opacity: !opacity ? 1 : 0, transition: '500ms ease all'}}>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
})
export default Wrapper;
