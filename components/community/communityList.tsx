import { observer } from "mobx-react";
import { useEffect } from "react";
import { CommunityStore } from "../../stores/CommunityStore";
import { useInjection } from "inversify-react";
import CommunityListItem from "./communityListItem";

const CommunityList = observer(() => {
  const { getCommunityList, communityList } = useInjection(CommunityStore);
  useEffect(() => {
    getCommunityList();
  }, []);
  return (
    <div>
      <div>
        <h1>Community List</h1>
      </div>
      <div>
        {communityList.map((el) => {
          return <CommunityListItem community={el} />;
        })}
      </div>
    </div>
  );
});
export default CommunityList;
