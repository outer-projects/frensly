import classNames from "classnames";
import style from "./claimMenu.module.scss";
const usersForClaim = [
  {
    name: "Twitter Name",
    nick: "@sample_nick",
    eth: "3,34 ETH",
    img: "../../empty_avatar.svg",
  },
  {
    name: "Twitter Name",
    nick: "@sample_nick",
    eth: "3,34 ETH",
    img: "../../empty_avatar.svg",
  },
  {
    name: "Twitter Name",
    nick: "@sample_nick",
    eth: "3,34 ETH",
    img: "../../empty_avatar.svg",
  },
];
const ClaimMenu = () => {
  return (
    <div className={style.claim__container}>
      <div className={style.claim}>
        <div className={style.claim__title}>
          0xRacer
          <img src="../frensly__avatar.svg" />
        </div>
        <div className={classNames(style.claim__subtitle, style.claim__tech)}>
          Your friend.tech points count: 121,234
        </div>
        <div className={style.claim__stats}>
          <div className={style.claim__stat}>
            <div className={style.claim__stat__name}>Portfolio value</div>
            <div className={style.claim__stat__value}>15,34 ETH</div>
          </div>
          <div className={style.claim__stat}>
            <div className={style.claim__stat__name}>Fees Earned</div>
            <div className={style.claim__stat__value}>0,34 ETH</div>
          </div>
        </div>
        <div className={style.claim__title}>Available for claim</div>
        <div className={classNames(style.claim__subtitle, style.claim__fees)}>Claim your fees </div>
        {usersForClaim.map((el, i) => {
          return (
            <div key={i} className={style.claim__user}>
              <div className={style.claim__face}>
                <img src={el.img} />
                <div className={style.claim__nickname}>
                  <div className={style.claim__name}>{el.name}</div>
                  <div className={style.claim__nick}>{el.nick}</div>
                </div>
              </div>
              <div className={style.claim__face}>
                <div className={style.claim__price}>{el.eth}</div>
                <button className={style.claim__button}>Claim</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.claim__logout}>Logout</div>
    </div>
  );
};
export default ClaimMenu;
