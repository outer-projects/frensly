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
  updateCommunity = async ({
    pondId,
    twitter,
    url,
    telegram,
    discord,
    description,
    file
  }: {
    pondId: number;
    twitter: string;
    description: string;
    url: string;
    telegram: string;
    discord: string;
    file?: File | null;
  }) => {
    const formData = new FormData();
    formData.append("pondId", pondId.toString());
    formData.append("twitter", twitter);
    formData.append("url", url);
    formData.append("telegram", telegram);
    formData.append("discord", discord);
    formData.append("description", description);
    file && formData.append("file", file as Blob);
    try {
      const res = await axios.post(prefix + "pond/customize", formData);
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
