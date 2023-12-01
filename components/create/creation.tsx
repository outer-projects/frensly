import { useContext, useEffect, useState } from "react";
import CreationProgressBar from "./components/creationProgressBar";
import StageOne from "./stages/stageOne";
import StageTwo from "./stages/stageTwo";
import style from "./create.module.scss";
import { SocketContext } from "../../utils/socket";
import { observable } from "mobx";
import { observer } from "mobx-react";
const Creation = observer(() => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [webSite, setWebSite] = useState("");
  const [tg, setTg] = useState("");
  const [discord, setDiscord] = useState("");
  const socket = useContext(SocketContext);
  const [wl, setWl] = useState(false);
  const [handle, setHandle] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [backendPondId, setBackendPondId] = useState<number | null>(null);
  const [cover, setCover] = useState<null | File>(null);
  useEffect(() => {
    if (socket) {
      console.log(socket);
      socket.on("newPond", (pond: any) => {
        console.log(pond);
        setBackendPondId(Number(pond.pondId));
      });
    }
  }, [socket]);
  useEffect(() => {
    return () => {
      socket.emit("leaveMonitor");
      socket.off("newPond");
    };
  }, []);
  return (
    <div className={style.stage__one__create}>
      <CreationProgressBar step={step} />
      {step == 0 && (
        <StageOne
          setDescription={setDescription}
          setStep={setStep}
          setImage={setImage}
          setCover={setCover}
          cover={cover}
          image={image}
          name={name}
          setName={setName}
          discord={discord}
          setDiscord={setDiscord}
          description={description}
          twitter={twitter}
          setTwitter={setTwitter}
          webSite={webSite}
          setWebSite={setWebSite}
          tg={tg}
          setTg={setTg}
          handle={handle}
          setHandle={setHandle}
          backendPondId={backendPondId}
        />
      )}
      {step == 1 && (
        <StageTwo
          setDescription={setDescription}
          setStep={setStep}
          setImage={setImage}
          image={image}
          setCover={setCover}
          cover={cover}
          name={name}
          setName={setName}
          discord={discord}
          setDiscord={setDiscord}
          description={description}
          twitter={twitter}
          setTwitter={setTwitter}
          webSite={webSite}
          setWebSite={setWebSite}
          tg={tg}
          setTg={setTg}
          handle={handle}
          setHandle={setHandle}
          backendPondId={backendPondId}
        />
      )}
    </div>
  );
});
export default Creation;
