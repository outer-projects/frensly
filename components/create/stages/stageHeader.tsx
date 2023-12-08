import { IStageOne } from "./stageOne";
import style from "../create.module.scss";
import { socials } from "../../community/community";
import communityStyle from "../../community/community.module.scss";
import { useMemo } from "react";

const StageHeader = ({ stage }: { stage: IStageOne }) => {
  const cover = useMemo(() => {
    if (stage.cover) {
      return URL.createObjectURL(stage.cover);
    }
    return "";
  }, [stage.cover]);
  const image = useMemo(() => {
    if (stage.image) {
      return URL.createObjectURL(stage.image);
    }
    return "";
  }, [stage.image]);

  return (
    <div className={communityStyle.configuration__user}>
      {stage.cover ? (
        <img
          src={cover}
          className={communityStyle.configuration__user__cover}
        />
      ) : (
        <div className={style.configuration__cover}>
          <div className={style.configuration__cover__title}>Cover</div>
          <div className={style.configuration__size}>
            Recommended size 1920x648{" "}
          </div>
        </div>
      )}
      <div className={communityStyle.configuration__user__items}>
        <div className={communityStyle.configuration__user__name}>
          {stage.image && <img src={image} />}
          <div>{stage.name}</div>
        </div>
        <div className={communityStyle.configuration__user__socials}>
          {socials.map((social, i) => {
            // if (currentCommunity[social.name] == undefined)
            //   return null;
            return (
              <div
                style={{
                  cursor: "pointer",
                  filter: "brightness(0%)",
                }}
                className={communityStyle.configuration__user__social}
                key={i}
              >
                <img src={social.icon} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default StageHeader;
