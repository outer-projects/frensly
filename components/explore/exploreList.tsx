import style from "./explore.module.scss";
export const list = [
  { title: "Personal shares", img: "../icons/personal.svg" },
  { title: "Community shares", img: "../icons/community.svg" },
  { title: "Launchpad", img: "../icons/launchpad.svg" },
];
const ExploreList = () => {
  return (
    <div className={style.explore__list}>
      {list.map((item) => {
        return (
          <div className={style.explore__list__item}>
            <img src={item.img} />
            <div>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};
export default ExploreList;
