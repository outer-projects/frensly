import classNames from "classnames";
import style from "./profile.module.scss";
import Link from "next/link";
import { links } from "./profile";
const Airdrop = () => {
  return (
    <div className={style.profile__page}>
      <div className={style.profile__side}>
        {links.map((el, i) => {
          return (
            <Link href={el.link} style={{ textDecoration: "none" }}>
              <div key={i} className={style.profile__link}>
                <img src={el.img} />
                {el.title}
              </div>
            </Link>
          );
        })}
      </div>
      <div className={style.profile__container}>
        <div className={style.profile__title__main}>Airdrop</div>
        <div className={style.profile}>
          <div
            className={classNames(style.profile__subtitle, style.profile__posts)}
          >
            Create posts on frensly and twitter and enjoy juicy airdrops
          </div>
          <div className={style.profile__stats} style={{marginBottom:'14px'}}>
            <div className={style.profile__stat}>
              <div className={style.profile__stat__name}>Your points</div>
              <div className={style.profile__stat__value}>12</div>
            </div>
            <div className={style.profile__stat}>
              <div className={style.profile__stat__name}>Global rank</div>
              <div className={style.profile__stat__value}>#N/A</div>
            </div>
          </div>
          <div
            className={classNames(style.profile__subtitle, style.profile__epoch)}
          >
            Active Epoch{" "}
          </div>
          <div className={style.profile__stat} style={{height:'80px',padding:'15px'}}>
            <div className={style.profile__stat__name}>
              <div className={style.profile__ep}>Epoch 1</div>
              <div>Sep 06-Sep 21</div>
            </div>
            <div className={style.profile__stat__value}>
              <div className={style.profile__money}>$120,000</div>
              <div className={style.profile__subtitle}>Prize pool</div>
            </div>
          </div>
          <div className={style.profile__separator}/>
          <div className={style.profile__earn}>How to earn points</div>
        </div>
        <div className={style.profile__logout}>Logout</div>
      </div>
    </div>
  );
};
export default Airdrop;
