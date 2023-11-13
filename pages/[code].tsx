import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "./home.module.scss";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";

const CodePage: NextPage = observer((props) => {
  const { push } = useRouter();
  useEffect(() => {
    push("/explore");
  }, []);
  const router = useRouter();
  const { code } = router.query;
  useEffect(() => {
    if (code && code.includes("fren")) {
      localStorage.setItem("invite", code as string);
    }
  }, [code]);
  const { unreadCount } = useInjection(UserStore);
  return (
    <div className={style.main__page}>
      <Head>
        <title>{unreadCount !== 0 ? `(${unreadCount})` : ""}Frensly</title>
         <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
    </div>
  );
});

export default CodePage;
