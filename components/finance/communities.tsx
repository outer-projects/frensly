import classNames from "classnames";
import style from "./finance.module.scss";
import { useRouter } from "next/router";
import Sidebar from "./sidebar";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { useEffect, useState } from "react";
import { UserStore } from "../../stores/UserStore";
import header from "../layout/header.module.scss";
import TypesList from "../common/typesList";
import { types } from "./invite";
import User from "./user";
import CommunityRow from "./communityRowFinance";

const Communities = observer(() => {
  const [active, setActive] = useState(4);
  const [activeComm, setActiveComm] = useState(0);
  const commtypes = ["Created", "Holding"];
  const [communitiesReady, setCommunitiesReady] = useState(false);
  const { user } = useInjection(Web3Store);
  const { getMyCommunities, myCommunities, getMyHoldings } =
    useInjection(UserStore);
  const router = useRouter();
  useEffect(() => {
    if (active == 0) {
      router.push("/dashboard/finance");
    }
    if (active == 1) {
      router.push("/dashboard/invite");
    }
    if (active == 2) {
      router.push("/dashboard/airdrop");
    }
    if (active == 3) {
      router.push("/dashboard/rankings");
    }
  }, [active]);
  console.log(myCommunities);
  useEffect(() => {
    if (user && !communitiesReady) {
      setCommunitiesReady(true);
      getMyCommunities(user._id);
      getMyHoldings(user._id)
    }
  }, [user]);
  return (
    <div className={style.finance__page}>
      <Sidebar />
      <div className={style.communities__container}>
        <div className={style.finance__container}>
          <div className={style.finance__links}>
            <TypesList active={active} setActive={setActive} types={types} />
          </div>
          <div className={style.finance}>
            <User stage="airdrop" />

            <>
              <div className={style.finance__invite}>Your community</div>
              <div
                className={style.finance__invite__text}
                style={{ marginBottom: "0px" }}
              >
                List of communities you created
              </div>
            </>
          </div>
          <TypesList
            active={activeComm}
            setActive={setActiveComm}
            types={commtypes}
          />
          <div>
            <CommunityRow el />
          </div>
        </div>
        <div>
          <button
            className={classNames(
              header.connect__button,
              style.finance__claim__community
            )}
            onClick={() => {
              router.push("/communities/create");
            }}
          >
            Create New Community
          </button>
        </div>
      </div>
    </div>
  );
});
export default Communities;
