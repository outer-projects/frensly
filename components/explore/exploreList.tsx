import { useEffect, useState } from "react";
import style from "./explore.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames";
import useDarkMode from "use-dark-mode";
import Personal from "../svgs/personal";
import Launchpad from "../svgs/launchpad";
import Community from "../svgs/community";
export const list = [
  {
    title: "Personal shares",
    img: "personal",
    link: "/explore/personal",
  },
  {
    title: "Community shares",
    img: "community",
    link: "/explore/community",
  },
  {
    title: "Launchpad",
    img: "launchpad",
    link: "/explore/launchpad",
  },
];
const ExploreList = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const darkMode = useDarkMode();
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
          let color = active !== i ? "#676766" : "#151614";
          return (
            <div
              className={classNames(
                style.explore__list__item,
                active == i && style.explore__list__item__active
              )}
              onClick={() => {
                router.push(item.link);
              }}
              key={item.title}
            >
              <div
                className={style.explore__container__img}
                style={{
                  filter: "invert(" + (darkMode.value ? "1" : "0") + ")",
                }}
              >
                {" "}
                {item.img == "personal" && <Personal color={color} />}
                {item.img == "community" && <Community color={color} />}
                {item.img == "launchpad" && <Launchpad color={color} />}
              </div>
              <div>{item.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ExploreList;
