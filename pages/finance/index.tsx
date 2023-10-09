import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Finance from "../../components/finance/finance";

const FinancePage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Finance/>
    </div>
  );
});

export default FinancePage;
