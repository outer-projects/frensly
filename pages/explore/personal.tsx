import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Explore from "../../components/explore/presonal/explore";
import Head from "next/head";
import { useInjection } from "inversify-react";
import { UserStore } from "../../stores/UserStore";
import ExploreList from "../../components/explore/exploreList";

const PersonalPage: NextPage = observer((props) => {
  // const socket = useContext(SocketContext);
  // const startListening = async () => {
  //   socket.on("join", () => {
  //     console.log("hi join");
  //   });
  //   socket.emit("join");
  // };
  // const stopListen = () => {
  //   socket.off("join");
  // };
  // useEffect(() => {
  //   startListening();
  //   return () => stopListen();
  // }, []);
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.explore__page}>
      <Head>
        <title>
          {unreadCount !== 0 ? `(${unreadCount})` : ""} Personal | Frensly
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      {/* <ExploreList/> */}
      <Explore />
    </div>
  );
});

export default PersonalPage;
