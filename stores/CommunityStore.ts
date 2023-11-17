import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";
import { IStageOne } from "../components/create/stages/stageOne";

@injectable()
export class CommunityStore {
  @observable topUsersList: IProfile[] = [];
  @observable currentCommunity: any = undefined;
  @observable currentPresale: any = undefined;
  @observable currentWhitelist: any[] = [];
  @observable presaleList: any[] = [];
  @observable communityList: any[] = [];
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  updateCommunity = async (id: string, stage: IStageOne) => {
    const formData = new FormData();

    try {
      const res = await axios.post(prefix + "pond/customize" + id, formData);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getCommunity = async (id: string) => {
    try {
      const res = await axios.get(prefix + "pond" + id);
      console.log(res);
      this.currentCommunity = res.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getPresale = async (id: string) => {
    try {
      const presale = await axios.get(prefix + "pond" + id);
      const whitelist = await axios.get(
        prefix + "pond/whitelist/applications/" + id
      );
      console.log(presale);
      this.currentPresale = presale.data;
      this.currentWhitelist = whitelist.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getCommunityList = async () => {
    try {
      const res = await axios.get(prefix + "pond/public");

      this.communityList = res.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getPresaleList = async () => {
    try {
      const res = await axios.get(prefix + "pond/presales");

      this.presaleList = res.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
