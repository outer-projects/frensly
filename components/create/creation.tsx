import { useState } from "react";
import CreationProgressBar from "./components/creationProgressBar";
import StageOne from "./stages/stageOne";
import StageTwo from "./stages/stageTwo";
import StageThree from "./stages/stageThree";

const Creation = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [webSite, setWebSite] = useState("");
  const [tg, setTg] = useState("");
  const [discord, setDiscord] = useState("");
  const [fee, setFee] = useState(0);
  const [pricingModel, setPricingModel] = useState(0);
  const [image, setImage] = useState<null | File>(null);
  return (
    <div>
      <CreationProgressBar step={step} />
      {step == 0 && (
        <StageOne
          setDescription={setDescription}
          setStep={setStep}
          pricingModel={pricingModel}
          setFee={setFee}
          fee={fee}
          setPricingModel={setPricingModel}
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
        />
      )}
      {step == 1 && <StageTwo setStep={setStep} />}
      {step == 2 && <StageThree setStep={setStep} />}
    </div>
  );
};
export default Creation;
