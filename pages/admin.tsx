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
  const {
    verify,
    makeAdmin,
    createCodes,
    unban,
    unverify,
    ban,
    getAdminPoints,
    pointsInfo,
  } = useInjection(AdminStore);
  const [handle, setHandle] = useState("");
  const [codeToGenerate, setCodeToGenerate] = useState("");
  const [admin, setAdmin] = useState("");
  const [_ban, setBan] = useState("");
  const [_unban, setUnban] = useState("");
  const [_unverify, setUnverify] = useState("");
  const [code, setCode] = useState("");
  const { user } = useInjection(Web3Store);
  useEffect(() => {
    if (user?.role !== "admin") {
      push("/explore");
    } else {
      getAdminPoints();
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
        Unferify user
        <input
          placeholder="Twitter handle"
          value={_unverify}
          onChange={(e) => setUnverify(e.target.value)}
        />
        <button
          onClick={() => {
            unverify(_unverify);
            setUnverify("");
          }}
        >
          Unferify
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
        ban user
        <input
          placeholder="Twitter handle"
          value={_ban}
          onChange={(e) => setBan(e.target.value)}
        />
        <button
          onClick={() => {
            ban(_ban);
            setBan("");
          }}
        >
          ban
        </button>
      </div>
      <div className={style.explore__row}>
        unban user
        <input
          placeholder="Twitter handle"
          value={_unban}
          onChange={(e) => setUnban(e.target.value)}
        />
        <button
          onClick={() => {
            unban(_unban);
            setUnban("");
          }}
        >
          unban
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
      <div className={style.explore__row}>
        <span> Points per hour</span>
        <span>{Number(pointsInfo?.hourlyStats?.pointsDistributed)?.toFixed(0)}</span>
      </div>
      <div className={style.explore__row}>
        <span>Total points</span>
        <span>{Number(pointsInfo?.totalPoints)?.toFixed(0)}</span>
      </div>
    </div>
  );
});
export default Admin;
