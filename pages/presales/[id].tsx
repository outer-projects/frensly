import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";
import style from "../home.module.scss";
import Presale from "../../components/community/presale";

const PresalePage = () => {
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.community__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Create | Frensly
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Presale />
    </div>
  );
};
export default PresalePage;
