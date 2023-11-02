import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import style from "./buy.module.scss";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import useDarkMode from "use-dark-mode";
import classNames from "classnames";
import header from "../components/layout/header.module.scss";
import { FeedStore } from "../stores/FeedStore";
import { useRouter } from "next/router";
interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}

export const DeletePostModal = observer(({ key, data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  const { deletePost, setHideRow } = useInjection(FeedStore);
  const router = useRouter();
  const darkMode = useDarkMode();
  const deleteP = () => {
    deletePost(data.post._id).then((res) => {
      if (res && data.setDeleted) {
        modalStore.hideAllModals()
        data.setDeleted(true);
      }
      if (res && data.isRepost) {
        modalStore.hideAllModals()
        setHideRow(data.post._id);
      }
      if (res && data.isOnePostPage) {
        modalStore.hideAllModals()
        router.push("../../profile/" + data.post.user.twitterId);
      }
    });
  };
  return (
    <ModalContainer heading={""} modalKey={key} idx={idx}>
      <div className={style.delete}>
        <div className={style.delete__top}>
          You sure that you want to delete post?
          <img
            src="../icons/Close.svg"
            style={{
              cursor: "pointer",
              alignSelf: "flex-end",
              marginTop: "-20px",
              filter: `invert(${darkMode.value ? "1" : "0"})`,
            }}
            onClick={() => {
              modalStore.hideAllModals();
            }}
          />
        </div>
        {data.postText
          ? data.postText
          : data?.post?.text
          ? data?.post?.text?.slice(0, 50)
          : ""}
        <div className={style.delete__buttons}>
          <button
            className={classNames(
              header.connect__button,
              style.delete__button__no
            )}
            onClick={()=>modalStore.hideAllModals()}
          >
            No
          </button>
          <button
            className={classNames(header.connect__button, style.delete__button)}
            onClick={deleteP}
          >
            Yes
          </button>
        </div>
      </div>
    </ModalContainer>
  );
});
