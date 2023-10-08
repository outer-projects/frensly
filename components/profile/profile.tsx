import style from "./profile.module.scss";
import explore from "../explore/explore.module.scss";
import header from "../layout/header.module.scss";
import classNames from "classnames";
import TwitterFeed from "./twitterFeed";
import { ModalStore } from "../../stores/ModalStore";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ModalsEnum } from "../../modals";
const Profile = observer(() => {
  const modalStore = useInjection(ModalStore)
  return (
    <div className={style.profile}>
      <div className={explore.explore__title}>My profile</div>
      <div className={style.profile__info}>
        <div className={style.profile__row}>
          <div className={style.profile__title}>
            <img className={style.avatar} src="../Avatar.svg" />
            <div>
              <div className={style.profile__name}>
                0xRacer{" "}
                <img
                  src="../icons/twitter_black.svg"
                  style={{ marginRight: "5px" }}
                />{" "}
                <span>@0xRacer</span>
              </div>
              <div className={style.profile__subtitle}>0xFakf...39f40</div>
            </div>
          </div>
        </div>{" "}
        <div className={style.profile__button}>
          <button
            className={classNames(header.connect__button, style.profile__buy)}
            onClick={()=>modalStore.showModal(ModalsEnum.Buy)}
          >
            Buy
          </button>
        </div>
        <div className={classNames(style.profile__text, style.profile__share)}>
          You own {1} share
        </div>
        <div className={style.profile__stats}>
          <div className={style.profile__stats__row}>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>NW</div>
              <div className={classNames(style.profile__text, style.black)}>
                $140.032
              </div>
            </div>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>Per 1 share</div>
              <div
                className={classNames(
                  style.profile__text,
                  style.profile__balance
                )}
              >
                <img src="../icons/Etherium.svg" />
                1.22 ETH
              </div>
            </div>
          </div>
          <div className={style.profile__stats__row}>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>TVH</div>
              <div className={classNames(style.profile__text, style.black)}>
                <img src="../icons/Info.svg"/>
                $49.000.000
              </div>
            </div>
            <div className={style.profile__stats__line}>
              <div className={style.profile__text}>Volume</div>
              <div className={classNames(style.profile__text, style.black)}>
                23432 ETH
              </div>
            </div>
          </div>
        </div>
        <div className={style.profile__stats__follows}>
          <div className={style.profile__stats__follow}>
            <div
              className={style.profile__text}
              style={{ marginRight: "17px" }}
            >
              <span>115</span> Following
            </div>
            <div className={style.profile__text}>
              <span>115</span> Followers
            </div>
          </div>
          <div className={style.profile__stats__follow}>
            <div
              className={style.profile__text}
              style={{ marginRight: "17px" }}
            >
              <span>115</span> Holders
            </div>
            <div className={style.profile__text}>
              <span>115</span> Holding
            </div>
          </div>
        </div>
        <div className={style.profile__bottom }>
          <div className={style.profile__types}>
            <div
              className={classNames(
                style.profile__type,
                style.profile__type__active
              )}
            >
              Posts
            </div>
          </div>
          <div className={style.profile__buttons}>
            <button className={style.profile__light__button} style={{marginRight:'7px'}}>Activity</button>
            <button className={style.profile__light__button}>Chat</button>
          </div>
        </div>
      </div>
      <TwitterFeed/>
    </div>
  );
})
export default Profile;
