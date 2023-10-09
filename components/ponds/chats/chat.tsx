import style from "../ponds.module.scss";
import explore from "../../explore/explore.module.scss";
import header from "../../layout/header.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Write from "./write";
import { observer } from "mobx-react";
import { ModalStore } from "../../../stores/ModalStore";
import { useInjection } from "inversify-react";
import { ModalsEnum } from "../../../modals";
const Chat = observer(() => {
  const [active, setActive] = useState(0);
  useEffect(() => {}, []);
  function isEven(n: number) {
    n = Number(n);
    return n === 0 || !!(n && !(n % 2));
  }
  const modalStore = useInjection(ModalStore);
  return (
    <div className={style.openchat}>
      {" "}
      <div className={explore.explore__title}>User pond</div>
      <div className={style.openchat__info}>
        <div className={style.openchat__user}>
          <div className={style.openchat__user__left}>
            <img
              className={style.openchat__avatar}
              src="../icons/AvatarBlue.svg"
            />
            <div className={style.openchat__user__left__text}>
              <div className={style.openchat__user__name}>UserName</div>
              <div className={style.openchat__status}>Online</div>
            </div>
          </div>
          <div className={style.openchat__user__right}>
            <button
              className={classNames(
                header.connect__button,
                style.openchat__button
              )}
              onClick={() => modalStore.showModal(ModalsEnum.Buy)}
            >
              Buy
            </button>
          </div>
        </div>
        <div className={style.openchat__row}>
          <div className={style.openchat__shares}>You own 1.59 shares</div>
          <div className={style.openchat__val}>
            {" "}
            <div className={style.openchat__share__value}>
              <img src="../../icons/Ethereum.svg" />
              1.22 ETH
            </div>
            <div className={style.openchat__shares}> per 1 share</div>
          </div>
        </div>
        <div className={style.openchat__row}>
          <div className={style.openchat__holders}>
            <div
              className={style.openchat__shares}
              style={{ marginRight: "17px" }}
            >
              <span>21</span> Holders
            </div>
            <div className={style.openchat__shares}>
              <span>21</span> Holding
            </div>
          </div>
          <div className={style.openchat__shares}>
            <span>TVH</span> $1.340.000
          </div>
        </div>
        <div className={style.openchat__messages}>
          {Array.from({ length: 10 }).map((el, i) => {
            return (
              <div
                className={classNames(
                  isEven(i)
                    ? style.openchat__my_message
                    : style.openchat__message_to_me
                )}
              >
                <div>Message from 123 123</div>
                <div className={style.openchat__time}>10:12</div>
              </div>
            );
          })}
        </div>
        <Write />
      </div>
    </div>
  );
});
export default Chat;
