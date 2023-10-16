import classNames from "classnames";
import style from "./finance.module.scss";
import Link from "next/link";
import { links } from "./finance";
import explore from "../explore/explore.module.scss";
import User from "./user";
import header from "../layout/header.module.scss";
import { useInjection } from "inversify-react";
import { useRouter } from "next/router";
import Sidebar from "./sidebar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { observer } from "mobx-react";
import Web3Store from "../../stores/Web3Store";
import { UserStore } from "../../stores/UserStore";
import { getDate } from "../../utils/utilities";
const Invite = observer(() => {
  const router = useRouter();
  const codes = ["fren-djjd89200", "fren-279891jsyu", "fren-279891jsyu"];
  const {user} = useInjection(Web3Store)
  const {getKeys, keys} = useInjection(UserStore)
  useEffect(() => {
    if (user) {
      getKeys()
    }
  }, [user]);
  return (
    <div className={style.finance__page}>
      <Sidebar />

      <div className={style.finance__container}>
        <div className={explore.explore__title}>Invite codes</div>
        <div className={style.finance}>
          <User />
          {keys.map((el) => {
            return (
              <div className={classNames(style.invite__code, el.isUsed && style.invite__code__used)}>
                {el.key}
                {/* @ts-ignore */}
                <CopyToClipboard
                  text={el.key}
                  onCopy={() => {
                    toast.success("Code is copied successfully");
                  }}
                >
                  {!el.isUsed && <img src="../icons/copy.svg" style={{cursor:'pointer'}} />}
                </CopyToClipboard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
})
export default Invite;
