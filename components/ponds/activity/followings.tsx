import { useInjection } from "inversify-react";
import FollowRow from "../followRow";
import { UserStore } from "../../../stores/UserStore";
import style from "../ponds.module.scss";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { InView } from "react-intersection-observer";
const Followings = observer(({ id }: { id: string }) => {
  const { followings, getFollowings, updateFollowings } =
    useInjection(UserStore);
  useEffect(() => {
    getFollowings(id);
  }, []);
  return (
    <div className={style.ponds__chat}>
      {followings?.map((el, i) => {
        // console.log(el);
        return (
          <>
            <FollowRow key={el._id} el={el} />
            {i !== 0 && i % 29 == 0 && (
              <InView
                as="div"
                triggerOnce
                onChange={(inView, entry) => {
                  if (inView) {
                    console.log("inview");
                    updateFollowings(id);
                  }
                }}
              ></InView>
            )}
          </>
        );
      })}
    </div>
  );
});
export default Followings;
