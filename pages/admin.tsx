import { observer } from "mobx-react";
import style from "./home.module.scss";
import { useInjection } from "inversify-react";
import Web3Store from "../stores/Web3Store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import header from "../components/layout/header.module.scss";
import { AdminStore } from "../stores/AdminStore";
const Admin = observer(() => {
  const { push } = useRouter();
  const { verify, makeAdmin, createCodes } = useInjection(AdminStore);
  const [handle, setHandle] = useState("");
  const [codeToGenerate, setCodeToGenerate] = useState("");
  const [admin, setAdmin] = useState("");
  const [code, setCode] = useState("");
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    if (user?.role !== "admin") {
      push("/explore");
    }
  }, [user]);
  return (
    <div className={style.explore__page}>
      <div className={style.explore__row}>
        Verify user
        <div>
          <input
            placeholder="Twitter handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          <input
            placeholder="Custom code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className={style.connect__button}
            onClick={() => {
              verify(handle, code);
              setHandle("");
            }}
          >
            Send
          </button>
        </div>
      </div>
      <div className={style.explore__row}>
        Make admin
        <div>
          <input
            placeholder="Twitter handle"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
          />
          <button
            className={style.connect__button}
            onClick={() => {
              makeAdmin(admin);
              setAdmin("");
            }}
          >
            Send
          </button>
        </div>
      </div>
      <div className={style.explore__row}>
        Generate codes
        <div>
          <input
            placeholder="Enter codes separated by coma"
            value={codeToGenerate}
            onChange={(e) => setCodeToGenerate(codeToGenerate)}
          />
          <button
            className={style.connect__button}
            onClick={() => {
              console.log(codeToGenerate.split(","));
              createCodes(codeToGenerate.split(","));
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
});
export default Admin;
