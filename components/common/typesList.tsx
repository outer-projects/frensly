import classNames from "classnames";
import profile from "../profile/profile.module.scss";
interface ITypes {
  types: string[];
  active: number;
  setActive: (s: number) => void;
  mobTypes?: string[];
}
const TypesList = ({ types, active, setActive, mobTypes }: ITypes) => {
  return (
    <div className={profile.profile__types}>
      {types.map((el, i) => (
        <div
          className={classNames(
            profile.profile__type,
            active == i && profile.profile__type__active
          )}
          onClick={() => {
            setActive(i);
          }}
        >
          {el}
        </div>
      ))}
      {mobTypes &&
        mobTypes.map((el, i) => (
          <div
            className={classNames(
              profile.profile__type,
              profile.profile__type__mob,
              active == types.length + i && profile.profile__type__active
            )}
            onClick={() => {
              setActive(types.length + i);
            }}
          >
            {el}
          </div>
        ))}
    </div>
  );
};
export default TypesList;
