import { useState } from "react";
import CreationProgressBar from "./components/creationProgressBar";
import StageOne from "./stages/stageOne";
import StageTwo from "./stages/stageTwo";
import StageThree from "./stages/stageThree";

const Creation = () => {
  const [step, setStep] = useState(0);
  return (
    <div>
      <CreationProgressBar step={step} />
      {step == 0 && <StageOne setStep={setStep} />}
      {step == 1 && <StageTwo setStep={setStep} />}
      {step == 2 && <StageThree setStep={setStep} />}
    </div>
  );
};
export default Creation;
