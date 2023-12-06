import Head from "next/head";
import { UserStore } from "../../../stores/UserStore";
import { useInjection } from "inversify-react";
import style from "../home.module.scss";
import Creation from "../../../components/create/creation";
import AuthPageWrap from "../../../components/layout/authPageWrap";
const Update = () => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <AuthPageWrap>
      <div className={style.explore__page}>
        <Head>
          <title>
            {unreadCount !== 0 ? `(${unreadCount})` : ""} Create | Frensly
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <Creation />
      </div>
    </AuthPageWrap>
  );
};
export default Update;
