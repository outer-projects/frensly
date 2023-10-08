import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Ponds from "../../components/ponds/ponds";

const PondsPage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Ponds />
    </div>
  );
});

export default PondsPage;
