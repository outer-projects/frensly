import { useState } from "react";
import style from "./faq.module.scss";
import classNames from "classnames";
const qa = [
  {
    q: "What is Frensly?",
    a: "What is Frensly?",
  },
  {
    q: "How does Frensly work?",
    a: "What is Frensly?",
  },
  {
    q: "What are the risks?",
    a: "What is Frensly?",
  },
  {
    q: "What is FRENS?",
    a: "What is Frensly?",
  },
  {
    q: "How can I unstake FRENS?",
    a: "What is Frensly?",
  },
];
const Faq = () => {
  const [active, setActive] = useState(0);
  return (
    <div className={style.faq}>
      <div className={style.title}>FAQ</div>
      {qa.map((el, i) => {
        return (
          <div
            key={i}
            onClick={()=>setActive(i)}
            className={classNames(style.qa, active == i && style.qa__active)}
          >
            <div className={style.q}>{el.q}</div>
            <div
              className={classNames(style.a, active == i && style.a__active)}
            >
              {el.a}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Faq;
