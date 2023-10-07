import classNames from "classnames";
import style from "./profile.module.scss";
import Link from "next/link";
export const links = [
  {
    title: "My Profile",
    link: "profile",
    img: "../icons/profile.svg",
  },
  {
    title: "Airdrop",
    link: "airdrop",
    img: "../icons/airdrop.svg",
  },
];
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
const Profile = () => {
  return (
    <div className={style.profile__page}>
      <div className={style.profile__side}>
        {links.map((el, i) => {
          return (
            <Link href={el.link} style={{textDecoration:'none'}}>
              <div key={i} className={style.profile__link}>
                <img src={el.img} />
                {el.title}
              </div>
            </Link>
          );
        })}
      </div>
      <div className={style.profile__container}>
        <div className={style.profile__title__main}>My Profile</div>
        <div className={style.profile}>
          <div className={style.profile__row}>
            <div className={style.profile__title}>
              <img src="../frensly__avatar.svg" />
              <div>
                <div>0xRacer</div>
                <div className={style.profile__subtitle}>0xFakf...39f40</div>
              </div>
            </div>
            <div className={style.profile__title}>
              <div className={style.profile__balance}>
                <div>0.0121 ETH</div>
                <div className={style.profile__subtitle}>Wallet balance</div>
              </div>
            </div>
          </div>
          <div
            className={classNames(style.profile__subtitle, style.profile__tech)}
          >
            Your friend.tech points count: 121,234
          </div>
          <div className={style.profile__stats}>
            <div className={style.profile__stat}>
              <div className={style.profile__stat__name}>Portfolio value</div>
              <div className={style.profile__stat__value}>15,34 ETH</div>
            </div>
            <div className={style.profile__stat}>
              <div className={style.profile__stat__name}>Fees Earned</div>
              <div className={style.profile__stat__value}>0,34 ETH</div>
            </div>
          </div>
          <div className={style.profile__title}>Available for claim</div>
          <div
            className={classNames(style.profile__subtitle, style.profile__fees)}
          >
            Claim your fees{" "}
          </div>
          {usersForClaim.map((el, i) => {
            return (
              <div key={i} className={style.profile__user}>
                <div className={style.profile__face}>
                  <img src={el.img} />
                  <div className={style.profile__nickname}>
                    <div className={style.profile__name}>{el.name}</div>
                    <div className={style.profile__nick}>{el.nick}</div>
                  </div>
                </div>
                <div className={style.profile__face}>
                  <div className={style.profile__price}>{el.eth}</div>
                  <button className={style.profile__button}>Claim</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.profile__logout}>Logout</div>
      </div>
    </div>
  );
};
export default Profile;
