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
          onClick={() => {
            verify(handle, code);
            setHandle("");
            setCode("");
          }}
        >
          Send
        </button>
      </div>
      <div className={style.explore__row}>
        Make admin
        <input
          placeholder="Twitter handle"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
        />
        <button
          onClick={() => {
            makeAdmin(admin);
            setAdmin("");
          }}
        >
          Send
        </button>
      </div>
      <div className={style.explore__row}>
        Generate codes
        <input
          placeholder="Enter codes separated by coma"
          value={codeToGenerate}
          style={{ width: "250px" }}
          onChange={(e) => setCodeToGenerate(e.target.value)}
        />
        <button
          onClick={() => {
            console.log(codeToGenerate.split(","));
            createCodes(codeToGenerate.split(",").map((el) => el.trim()));
            setCodeToGenerate("");
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
});
export default Admin;
