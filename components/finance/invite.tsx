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
const Invite = () => {
  const router = useRouter();
  const codes = ["fren-djjd89200", "fren-279891jsyu", "fren-279891jsyu"];
  return (
    <div className={style.finance__page}>
      <Sidebar />

      <div className={style.finance__container}>
        <div className={explore.explore__title}>Invite codes</div>
        <div className={style.finance}>
          <User />
          {codes.map((el) => {
            return (
              <div className={style.invite__code}>
                {el}
                {/* @ts-ignore */}
                <CopyToClipboard
                  text={el}
                  onCopy={() => {
                    toast.success("Code is copied successfully");
                  }}
                >
                  <img src="../icons/copy.svg" style={{cursor:'pointer'}} />
                </CopyToClipboard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Invite;
