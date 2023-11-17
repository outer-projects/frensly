import { observer } from "mobx-react";
import { useEffect } from "react";
import { CommunityStore } from "../../stores/CommunityStore";
import { useInjection } from "inversify-react";
import CommunityListItem from "./communityListItem";
import PresaleListItem from "./presaleListItem";

const PresaleList = observer(() => {
  const { getPresaleList, presaleList } = useInjection(CommunityStore);
  useEffect(() => {
    getPresaleList();
  }, []);
  return (
    <div>
      <div>
        <h1>Presale List</h1>
      </div>
      <div>
        {presaleList.map((el) => {
          return <PresaleListItem presale={el} />;
        })}
      </div>
    </div>
  );
});
export default PresaleList;
