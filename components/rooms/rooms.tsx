import style from "./rooms.module.scss"

const roomsMock = [
  {
    nickname: "@nickname",
    text: "Twitter name: Last message in this room, but not so long...... ",
    date: "3d",
    unread: true,
    img: "../empty_avatar.svg",
  },
];

const Rooms = () => {
  return (
    <div className={style.rooms}>
      <div className={style.rooms__title}>Rooms</div>
      {roomsMock.map((el, i) => {
        return (
          <div className={style.rooms__message} key={i}>
            <img className={style.rooms__message__avatar} src={el.img} />
            <div>
              <div className={style.rooms__message__nickname}>
                {el.nickname}
                <span>{el.date}</span>
              </div>
              <div className={style.rooms__message__text}>{el.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Rooms;
