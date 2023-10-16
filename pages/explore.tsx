import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import Explore from "../components/explore/explore";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { SocketContext } from "../utils/socket";

const ExplorePage: NextPage = observer((props) => {
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
  return (
    <div className={style.explore__page}>
      <Head>
        <title>Frensly</title>
      </Head>
      <Explore />
    </div>
  );
});

export default ExplorePage;
