import { observer } from "mobx-react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { UserStore } from "../stores/UserStore";

const Home: NextPage = observer((props) => {
  const { setOpacity } = useInjection(UserStore);
  useEffect(() => {
    setOpacity(false);
  }, []);
  return <div>123123123</div>;
});

export default Home;
