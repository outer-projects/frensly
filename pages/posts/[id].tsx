import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Profile from "../../components/profile/profile";
import Head from "next/head";
import PostWithComments from "../../components/profile/postWithComments";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";

const PostPage: NextPage = observer((props) => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.post__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Post | Frensly
        </title>
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <PostWithComments />
    </div>
  );
});

export default PostPage;
