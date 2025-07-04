import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";
import style from "../home.module.scss";
import Presale from "../../components/community/presale";
import { useEffect, useState } from "react";
import { CommunityStore } from "../../stores/CommunityStore";
import { useRouter } from "next/router";
import Web3Store from "../../stores/Web3Store";
import Whitelist from "../../components/community/whitelist";
import { observer } from "mobx-react";

const PresalePage = observer(() => {
  const { unreadCount } = useInjection(UserStore);
  const router = useRouter();
  const { user } = useInjection(Web3Store);
  const { currentPresale, clearPresale } =
    useInjection(CommunityStore);
  const [isCreator, setIsCreator] = useState(false);
  const [openWhitelist, setOpenWhitelist] = useState(false);

  useEffect(() => {
    return () => {
      clearPresale();
    };
  }, []);
  useEffect(() => {
    if (user && currentPresale) {
      // console.log(
      //   "USER111111",
      //   user,
      //   currentPresale,
      //   currentPresale.creator.profile.twitterHandle,
      //   user.twitterHandle
      // );
      setIsCreator(
        currentPresale.creator.profile.twitterHandle == user.twitterHandle
      );
    }
  }, [user, currentPresale]);
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

      {/* {!openWhitelist ? (
        <Presale isCreator={isCreator} setOpenWhitelist={setOpenWhitelist} />
      ) : (
        <Whitelist setOpenWhitelist={setOpenWhitelist} />
      )} */}
    </div>
  );
});
export default PresalePage;
