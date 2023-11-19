import { observer } from "mobx-react";
import style from "../create/create.module.scss";
import Web3Store from "../../stores/Web3Store";
import { useInjection } from "inversify-react";
import WhitelistProgressBar from "./whitelistProgressBar";
import WhitelistRow from "./whitelistRow";
import classNames from "classnames";
import header from "../layout/header.module.scss";
import { useRouter } from "next/router";
import useDarkMode from "use-dark-mode";
import presale from "./presale.module.scss";
const Whitelist = observer(
  ({ setOpenWhitelist }: { setOpenWhitelist: (open: boolean) => void }) => {
    const { user, community, address } = useInjection(Web3Store);
    const router = useRouter();
    const darkmode = useDarkMode();
    const { id } = router.query;
    const complete = async () => {
      try {
        const res = await community.methods.finalizePresale(id).send({
          from: address,
        });
        console.log(res);
        router.push("/community");
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <div className={style.stage__one}>
        <div className={classNames(presale.configuration__back)} onClick={()=>{
          setOpenWhitelist(false)
        }}>
          <img
            src={"../../icons/arrow_back.svg"}
            style={{
              marginRight: "8px",
              filter: `invert(${darkmode.value ? "1" : "0"})`,
            }}
          />
          <div>back</div>
        </div>
        <div className={style.stage__one__user}>
          <img className={style.stage__one__user__avatar} src={user?.avatar} />
          <div className={style.stage__one__user__name}>
            {user?.twitterName} presale regups
          </div>
          <WhitelistProgressBar progress={20} />
        </div>
        <div className={style.stage__three__col}>
          <WhitelistRow />
        </div>
        <div className={style.stage__one__buttons}>
          <button
            className={classNames(
              header.connect__button,
              style.stage__one__button
            )}
            onClick={complete}
          >
            Complete pre-sale
          </button>
        </div>
      </div>
    );
  }
);
export default Whitelist;
