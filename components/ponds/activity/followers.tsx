import { useInjection } from "inversify-react";
import FollowRow from "../followRow";
import { UserStore } from "../../../stores/UserStore";
import style from "../ponds.module.scss";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { InView } from "react-intersection-observer";

const Followers = observer(({ id }: { id: string }) => {
  const { followers, getFollowers, updateFollowers } = useInjection(UserStore);
  useEffect(() => {
    getFollowers(id);
  }, []);

  return (
    <div className={style.ponds__chat}>
      {followers?.map((el, i) => {
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
                    updateFollowers(id);
                  }
                }}
              ></InView>
            )}
          </>
        );
        // return <></>;
      })}
    </div>
  );
});
export default Followers;
