import { observer } from "mobx-react";
import Heart from "../socials/twitterUI/Heart";
import Message from "../socials/twitterUI/Message";
import Stats from "../socials/twitterUI/Stats";
import Swap from "../socials/twitterUI/Swap";
import Upload from "../socials/twitterUI/Upload";
import ThreeDots from "../socials/twitterUI/threeDots";
import style from "./profile.module.scss";
import { IPost } from "../../types/feed";

const TwitterPost = observer(({ post }: { post: IPost }) => {


  return (
    <div className={style.twitter__one__post}>
      <img className={style.twitter__avatar} src={post?.user?.avatar} />
      <div>
        <div className={style.twitter__row}>
          <div className={style.twitter__name}>{post?.user?.twitterName}</div>
          <div className={style.twitter__nickname}>
            @{post?.user?.twitterHandle}
          </div>
          <div className={style.twitter__time}>{post?.date?.getDate()}</div>
        </div>
        <div className={style.twitter__text}>{post?.text}</div>
        <div className={style.twitter__interact}>
          <div className={style.twitter__icon}>
            <div style={{ width: "24px", height: "24px", marginRight: "4px" }}>
              <Message />
            </div>
            <div>{post?.comments?.length || 0}</div>
          </div>
          <div className={style.twitter__icon}>
            <div style={{ width: "24px", height: "24px", marginRight: "4px" }}>
              <Swap />
            </div>
            <div>{post?.repostCount}</div>
          </div>
          <div className={style.twitter__icon}>
            <div style={{ width: "24px", height: "24px", marginRight: "4px" }}>
              <Heart isActive />
            </div>
            <div>{post?.likes?.length || 0}</div>
          </div>
        </div>
      </div>
      <ThreeDots />
    </div>
  );
});
export default TwitterPost;
