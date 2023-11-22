import { useState } from "react";
import CreationProgressBar from "./components/creationProgressBar";
import StageOne from "./stages/stageOne";
import StageTwo from "./stages/stageTwo";

const Creation = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [webSite, setWebSite] = useState("");
  const [tg, setTg] = useState("");
  const [discord, setDiscord] = useState("");
  const [wl, setWl] = useState(false);
  const [handle, setHandle] = useState('');
  const [image, setImage] = useState<null | File>(null);
  return (
    <div>
      <CreationProgressBar step={step} />
      {step == 0 && (
        <StageOne
          setDescription={setDescription}
          setStep={setStep}
          setImage={setImage}
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
      )}
      {step == 1 && (
        <StageTwo
          setDescription={setDescription}
          setStep={setStep}
          setImage={setImage}
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
      )}
    </div>
  );
};
export default Creation;
