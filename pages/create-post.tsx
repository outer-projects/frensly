import { useRouter } from "next/router";
import style from "../components/profile/profile.module.scss";
import useDarkMode from "use-dark-mode";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react";
import { ExploreStore } from "../stores/ExploreStore";
import write from "../components/ponds/ponds.module.scss";
import { useInjection } from "inversify-react";
import Web3Store from "../stores/Web3Store";
import { observer } from "mobx-react";
const CreatePost = observer(() => {
  const router = useRouter();
  //dark mode
  const [message, setMessage] = useState("");
  const darkMode = useDarkMode();
  const { searchUsers, mentionSearch, getTopFive, topFive } =
    useInjection(ExploreStore);
  const [openMentions, setOpenMentions] = useState(false);
  const [ment, setMent] = useState("");
  const saveInput = () => {
    searchUsers(ment, "mention");
  };
  const [tt, updateTimeout] = useState<any>(undefined);
  // console.log(ment);
  const searchDeb = (fn: any, ms: number) => {
    const clear = () => {
      clearTimeout(tt);
      updateTimeout(setTimeout(fn, ms));
    };
    return clear();
  };
  useEffect(() => {
    if (ment.length !== 0) {
      searchDeb(saveInput, 700);
    }
  }, [ment]);

  const mention = (el: string) => {
    setMessage(message.replace(ment, "") + el);
    setOpenMentions(false);
  };
  const { user } = useInjection(Web3Store);
  return (
    <div>
      <div className={style.twitter__one__post__header}>
        <img
          src={"../../icons/arrow_back.svg"}
          style={{
            marginRight: "8px",
            filter: `invert(${darkMode.value ? "1" : "0"})`,
          }}
          onClick={() => {
            router.back();
          }}
        />
        <div className={style.twitter__one__post__title}>New Post</div>
      </div>
      <TextareaAutosize
        value={message}
        style={{ resize: "none" }}
        placeholder="What is happening?"
        className={classNames(style.create__textarea)}
        onChange={(e: any) => {
          // console.log(e.key)
          let after = e.target.value.split("@");
          // console.log(after[after.length - 1]);
          let key = e.target.value.substring(e.target.value.length - 1);
          console.log(key);
          if (key == "@") {
            setOpenMentions(true);
          }
          if (key == " ") {
            setOpenMentions(false);
          }
          if (!e.target.value.includes("@")) {
            setOpenMentions(false);
          }
          if (openMentions) {
            setMent(after[after.length - 1]);
          } else {
            setMent("");
          }
          setMessage(e.target.value);
        }}
      />
      {openMentions && (
        <div
          className={write.write__mentions__post}
          style={{ fontFamily: "DMSans" }}
        >
          {(mentionSearch.length == 0 ? topFive : mentionSearch)
            .filter((el) => el.twitterId !== user?.twitterId)

            .map((el: any, i: number) => {
              return (
                <div
                  className={write.write__mention}
                  key={i}
                  onClick={() => mention(el.twitterHandle)}
                >
                  @{el.twitterHandle}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
});
export default CreatePost;
