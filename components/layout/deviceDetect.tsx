import { useEffect, useMemo, useState } from "react";
import { osName } from "react-device-detect";
import DownloadPWA from "./downloadPWA";

const DeviceDetect = ({ children }: any) => {
  const [pwa, setPWA] = useState(false);
  const checkPWA = useMemo(() => {
    if (osName == "Android" || osName == "iOS") {
      return true;
    } else {
      return false;
    }
  }, [osName]);
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setPWA(true);
    } else {
      setPWA(false);
    }
  }, []);
  return (
    <>
      {!checkPWA && children}
      {checkPWA && pwa ? children : <DownloadPWA />}
    </>
  );
};
export default DeviceDetect;
