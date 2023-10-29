import { useInjection } from "inversify-react";
import FollowRow from "../followRow";
import { UserStore } from "../../../stores/UserStore";
import style from "../ponds.module.scss";
import { observer } from "mobx-react";
import { useEffect } from "react";
import Web3Store from "../../../stores/Web3Store";
const Followers = observer(() => {
  const { followers, getFollowers } = useInjection(UserStore);
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    getFollowers(user?._id as string);
  }, []);
  
  return (
    <div className={style.ponds__chat}>
      {followers?.map((el) => {
        // console.log(el);
        return <FollowRow key={el._id} el={el} />;
        // return <></>;
      })}
    </div>
  );
});
export default Followers;
