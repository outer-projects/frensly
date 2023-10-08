import Heart from "../socials/twitterUI/Heart";
import Message from "../socials/twitterUI/Message";
import Stats from "../socials/twitterUI/Stats";
import Swap from "../socials/twitterUI/Swap";
import Upload from "../socials/twitterUI/Upload";
import ThreeDots from "../socials/twitterUI/threeDots";
import style from "./profile.module.scss";

const TwitterPost = () => {
  const socials = [
    {
      count: 20,
      img: <Message />,
    },
    {
      count: 16,
      img: <Swap />,
    },
    {
      count: 7,
      img: <Heart isActive />,
    },
    {
      count: 3,
      img: <Stats />,
    },
    {
      count: 0,
      img: <Upload />,
    },
  ];
  return (
    <div className={style.twitter__one__post}>
      <img className={style.twitter__avatar} src="../Avatar.svg" />
      <div>
        <div className={style.twitter__row}>
          <div className={style.twitter__name}>Twitter Name</div>
          <div className={style.twitter__nickname}>@sample_nick</div>
          <div className={style.twitter__time}>24h</div>
        </div>
        <div className={style.twitter__text}>
          SocialFi should be 100% onchain Text with a very long title to check.
          how it will look when everything is moved a few lines down. Plus still
          might add a picture, etc. SocialFi should be 100% onchain. Very long
          title to check. how it will look when everything is moved a few lines
          down. Plus still might add a picture, etc. SocialFi should be 100%
          onchain. With a very long title to check. how it will look when
          everything is moved a few lines down. Plus still might add a picture,
          etc.
        </div>
        <div className={style.twitter__interact}>
          {socials.map((el) => {
            return (
              <div className={style.twitter__icon}>
                <div style={{width:'24px', height:'24px', marginRight:'4px'}}>{el.img}</div> 
                <div>{el.count!==0 && el.count}</div>
              </div>
            );
          })}
        </div>
      </div>
      <ThreeDots />
    </div>
  );
};
export default TwitterPost;
