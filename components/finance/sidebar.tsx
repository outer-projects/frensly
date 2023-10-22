import Link from "next/link";
import { links } from "./finance";
import style from "./finance.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
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
              <img src={el.img} />
              {el.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Sidebar;
