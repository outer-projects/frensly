import { useContext, useState } from "react";
import StageOne from "./stages/stageOne";
import style from "./create.module.scss";
import { SocketContext } from "../../utils/socket";
import { observer } from "mobx-react";
const Creation = observer(() => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [webSite, setWebSite] = useState("");
  const [tg, setTg] = useState("");
  const [discord, setDiscord] = useState("");
  const socket = useContext(SocketContext);
  const [handle, setHandle] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [cover, setCover] = useState<null | File>(null);

  return (
    <div className={style.stage__one__create}>
      {/* <CreationProgressBar step={step} /> */}

      <StageOne
        setDescription={setDescription}
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
      />
    </div>
  );
});
export default Creation;
