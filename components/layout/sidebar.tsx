import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserStore } from "../../stores/UserStore";

const links = [
  {
    title: "MAIN",
    link: "/",
  },
  {
    title: "MINT",
    link: "/mint",
  },
  {
    title: "MINE",
    link: "/mine",
  },
  {
    title: "MY NFT",
    link: "/nft",
  },
  {
    title: "LANDS",
    link: "/LANDS",
    soon: true,
  },
  {
    title: "METAVERSE",
    link: "/METAVERSE",
    soon: true,
  },
];

const Sidebar = observer(() => {
  const router = useRouter();
  const {setOpacity} = useInjection(UserStore)
  return (
    <div className="main--nav">
      <div className="main--nav__list">
        {links.map((el, i) => {
          return (
            <div
              key={i}
              className={`main--nav__item button--main ${
                router.asPath == el.link ? "active" : el.soon ? "soon" : ""
              }`}
              onClick={() => {
                setOpacity(true)
                setTimeout(() => {
                  router.push(el.link);
                }, 500);
              }}
            >
              <span>{el.title}</span>
              {!el.soon ? (
                <img src="img/universe-mini.png" alt="" />
              ) : (
                <span className="soon--icon">coming soon</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="main--nav__social">
        <a href="#" className="twitter">
          <img src="img/twitter.png" alt="#" />
        </a>
        <a href="#" className="telegram">
          <img src="img/telegram.png" alt="#" />
        </a>
      </div>
    </div>
  );
});
export default Sidebar;
