import classNames from "classnames";
import style from "../ponds.module.scss";
import { observer } from "mobx-react";
import { getDate } from "../../../utils/utilities";
import { useInjection } from "inversify-react";
import Web3Store from "../../../stores/Web3Store";
import { useMemo } from "react";
// @ts-ignore
import Highlighter from "react-highlight-words";
const OneMessage = observer(({ el }: any) => {
  const { user } = useInjection(Web3Store);
  const mentions = useMemo(() => {
    const text = el.text.match(/@{[\w\s]+}/g);
    const result = text ? text.map((s: any) => "@" + s.slice(1, s.length - 1)) : []
    return result;
  }, [el.text]);
  console.log(mentions);
  return (
    <div
      className={classNames(
        el.user.twitterId == user?.twitterId
          ? style.openchat__my_message__container
          : style.openchat__message_to_me__container
      )}
      key={el._id}
    >
      {el.media && <img src={el.media} className={style.openchat__img} />}
      <div className={style.openchat__left}>
        {el.user.twitterId !== user?.twitterId && (
          <img className={style.openchat__avatar} src={el.user.avatar} />
        )}
        <div
          className={classNames(
            el.user.twitterId == user?.twitterId
              ? style.openchat__msg_container__my
              : style.openchat__msg_container
          )}
        >
          <div
            className={classNames(
              style.openchat__name,
              el.user.twitterId == user?.twitterId && style.openchat__mydate
            )}
          >
            {el.user.twitterId !== user?.twitterId && (
              <div>{el.user.twitterName}</div>
            )}
            {el.text == "" && (
              <div className={style.openchat__time}>{getDate(el.date)}</div>
            )}
          </div>
          {el.text !== "" && (
            <div
              className={classNames(
                el.user.twitterId == user?.twitterId
                  ? style.openchat__my_message
                  : style.openchat__message_to_me
              )}
              key={el._id}
            >
              <Highlighter
                highlightClassName={style.openchat__mention}
                searchWords={mentions}
                autoEscape={true}
                textToHighlight={el.text.replace("{", "").replace("}", "")}
              />{" "}
              <div className={style.openchat__time}>{getDate(el.date)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default OneMessage;
