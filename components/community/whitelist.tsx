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
import { CommunityStore } from "../../stores/CommunityStore";
import SubscriptionProgressBar from "./subscriptionProgressBar";
import { useEffect, useState } from "react";
const Whitelist = observer(
  ({ setOpenWhitelist }: { setOpenWhitelist: (open: boolean) => void }) => {
    const { community, address } = useInjection(Web3Store);
    const { currentPresale, currentWhitelist, getPresale } =
      useInjection(CommunityStore);
    const [closedAddresses, setClosedAddresses] = useState<string[]>([]);
    const router = useRouter();
    const darkmode = useDarkMode();
    const { id } = router.query;
    const [addressUserses, setAddressUserses] = useState<string[]>([]);
    const approve = async () => {
      try {
        const res = await community.methods
          .whitelist(currentPresale.pondId, addressUserses)
          .send({
            from: address,
          });
        setClosedAddresses([...closedAddresses, ...addressUserses]);
        setAddressUserses([]);
        // if (res) {
        //   setVisible(false);
        // }
      } catch (e) {
        console.log(e);
      }
    };
    useEffect(()=>{
      if(currentWhitelist.length>0){
        setClosedAddresses(currentWhitelist.filter((el)=>el.status=="ACCEPTED").map((el)=>el.user.address))
      }
    },[currentWhitelist])
    const complete = async () => {
      try {
        const res = await community.methods.finalizePresale(id).send({
          from: address,
        });
        console.log(res);
        router.push("/explore/community");
      } catch (e) {
        console.log(e);
      }
    };
    useEffect(() => {
      if (id && address) {
        getPresale(id as string, address as string);
      }
    }, [id, address]);
    return (
      <div className={style.stage__one}>
        <div
          className={classNames(presale.configuration__back)}
          onClick={() => {
            setOpenWhitelist(false);
          }}
        >
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
          <img
            className={style.stage__one__user__avatar}
            src={
              currentPresale?.image ? currentPresale?.image : "../../Avatar.svg"
            }
          />
          <div className={style.stage__one__user__name}>
            {currentPresale?.name} presale regups
          </div>
          <SubscriptionProgressBar
            supply={Number(currentPresale?.supply) / 10 ** 6}
            goal={Number(currentPresale?.presaleGoal) / 10 ** 6}
            progress={
              Number(
                (
                  Number(currentPresale?.supply) /
                  Number(currentPresale?.presaleGoal)
                ).toFixed(2)
              ) * 100
            }
          />
        </div>
        <div className={style.stage__three__col}>
          {currentWhitelist.map((el, i) => {
            return (
              <WhitelistRow
                user={el.user.profile}
                addressUser={el.user.address}
                key={i}
                closedAddresses={closedAddresses}
                addressUserses={addressUserses}
                setAddressUserses={setAddressUserses}
              />
            );
          })}
        </div>
        <div className={style.stage__one__buttons}>
          <button
            className={classNames(
              header.connect__button,
              style.stage__one__button
            )}
            onClick={approve}
          >
            Confirm adding
          </button>
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
