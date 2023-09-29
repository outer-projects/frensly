import { useEffect } from "react";
import ConnectButtonCustom from "./connectButtonCustom";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { NFTStore } from "../../stores/NFTStore";
import { network } from "../../utils/config";

const Header = observer(() => {
  const { getCharacters, getPlanets, setInit, init } = useInjection(NFTStore);
  const { address } = useInjection(Web3Store);
  useEffect(() => {
    if (address && !init) {
      setInit(true);
      getCharacters(address as string, network);
      getPlanets(address as string, network);
    }
  }, [address]);
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="header--wrapper">
            <ConnectButtonCustom />
          </div>
        </div>
      </div>
    </header>
  );
});
export default Header;
