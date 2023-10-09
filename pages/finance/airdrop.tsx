import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Airdrop from "../../components/finance/airdrop";

const AirdropPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Airdrop />
    </div>
  );
});

export default AirdropPage;
