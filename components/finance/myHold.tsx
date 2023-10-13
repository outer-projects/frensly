import { IProfile } from "../../types/users";
import ExploreRow from "../explore/exploreRow";

const MyHold = ({
  holds,
}: {
  holds?: { amount: string; user: IProfile }[];
}) => {
  return (
    <div>
      {holds?.map((el) => {
        return <ExploreRow el={el.user} />;
      })}
    </div>
  );
};
export default MyHold;
