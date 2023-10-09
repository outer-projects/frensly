import { observer } from "mobx-react";
import type { NextPage } from "next";
import style from "../home.module.scss";
import Profile from "../../components/profile/profile";

const ProfilePage: NextPage = observer((props) => {
  return (
    <div className={style.explore__page}>
      <Profile />
    </div>
  );
});

export default ProfilePage;
