import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";
import {IStageOne} from "../components/create/stages/stageOne";

@injectable()
export class CommunityStore {
  @observable topUsersList: IProfile[] = [];
  @observable topFive: IProfile[] = [];

  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  updateCommunity = async (id: string, stage: IStageOne) => {
    const formData = new FormData();
    formData.append("description", stage.description);
    formData.append("twitter", stage.twitter);
    formData.append("url", stage.webSite);
    formData.append("telegram", stage.tg);
    formData.append("discord", stage.discord);
    formData.append("image", stage.image as Blob);
    try {
      const res = await axios.post(prefix + "pond/customize" + id, formData);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
