import Link from "next/link";

import style from "./finance.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import ProfileSvg from "../svgs/profile";
import InviteSvg from "../svgs/invite";
import AirdropSvg from "../svgs/airdrop";
import AchivementsSvg from "../svgs/rankings";
import Community from "../svgs/community";
import useDarkMode from "use-dark-mode";

const Sidebar = () => {
  const router = useRouter();
  const darkMode = useDarkMode()
  const links = [
    {
      title: "My funds",
      link: "/dashboard/finance",
      img: <ProfileSvg />,
      active: true,
    },
    {
      title: "Referrals",
      link: "/dashboard/invite",
      img: <InviteSvg />,
      active: true,
    },
    {
      title: "Airdrop",
      link: "/dashboard/airdrop",
      img: <AirdropSvg />,
      active: true,
    },
    {
      title: "Rankings",
      link: "/dashboard/rankings",
      img: <AchivementsSvg />,
      active: true,
    },
    {
      title: "My communities",
      link: "/dashboard/communities",
      img: <Community color={darkMode.value ? "white" : "black"}/>,
      active: true,
    },
  ];
  return (
    <div className={style.finance__side}>
      {links.map((el, i) => {
        return (
          <Link
            href={el.active ? el.link : ""}
            style={{ textDecoration: "none" }}
          >
            <div
              key={i}
              style={{ color: !el.active ? "grey" : "" }}
              className={classNames(
                style.finance__link,
                el.link == router.asPath && style.finance__link__active
              )}
            >
              {el.img} 
              {el.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Sidebar;
