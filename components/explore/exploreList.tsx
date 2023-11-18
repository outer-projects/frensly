import { useEffect, useState } from "react";
import style from "./explore.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames";
export const list = [
  {
    title: "Personal shares",
    img: "../icons/personal.svg",
    link: "/explore/personal",
  },
  {
    title: "Community shares",
    img: "../icons/community.svg",
    link: "/explore/community",
  },
  {
    title: "Launchpad",
    img: "../icons/launchpad.svg",
    link: "/explore/launchpad",
  },
];
const ExploreList = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (router.asPath.includes("personal")) {
      setActive(0);
    } else if (router.asPath.includes("community")) {
      setActive(1);
    } else if (router.asPath.includes("launchpad")) {
      setActive(2);
    }
  }, [router.asPath]);
  return (
    <div className={style.explore__list__center}>
      <div className={style.explore__list}>
        {list.map((item, i) => {
          return (
            <div
              className={classNames(
                style.explore__list__item,
                active == i && style.explore__list__item__active
              )}
              onClick={() => {
                router.push(item.link);
              }}
            >
              <img src={item.img} />
              <div>{item.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ExploreList;
