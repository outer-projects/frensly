import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";
import { IStageOne } from "../components/create/stages/stageOne";
import { StatusesEnum } from "../components/explore/launchpad/presaleList";
@injectable()
export class CommunityStore {
  @observable topUsersList: IProfile[] = [];
  @observable currentCommunity: any = undefined;
  @observable currentPresale: any = undefined;
  @observable currentWhitelist: any[] = [];
  @observable presaleList: any[] = [];
  @observable presaleOffset: number = 0;
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
    file,
    name,
    handle,
  }: {
    name: string;
    handle: string;
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
    formData.append("name", name);
    formData.append("handle", handle);
    console.log(file);
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
      const res = await axios.get(prefix + "pond/get/" + id);
      console.log(res);
      this.currentCommunity = res.data.pond;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getPresale = async (id: string) => {
    try {
      const presale = await axios.get(prefix + "pond/get/" + id);
      const whitelist = await axios.get(
        prefix + "pond/whitelist/applications/" + id
      );
      console.log(presale);
      this.currentPresale = presale.data.pond;
      this.currentWhitelist = whitelist.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getCommunityList = async () => {
    try {
      const res = await axios.get(
        prefix + `pond/search?limit=0&offset=20&statuses=public`
      );
      console.log(res.data);
      this.presaleOffset = 20;
      this.presaleList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  updateCommunityList = async () => {
    const query = new URLSearchParams({
      offset: this.presaleOffset.toString(),
      limit: (this.presaleOffset + 20).toString(),
      statuses: "public",
    }).toString();
    try {
      const res = await axios.get(prefix + `pond/search?` + query);
      console.log(res.data);
      this.presaleOffset = this.presaleOffset + 20;
      this.presaleList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getPresaleList = async (status: string) => {
    try {
      const res = await axios.get(
        prefix + `pond/search?limit=0&offset=20&statuses=${status}`
      );
      console.log(res.data);
      this.presaleOffset = 20;
      this.presaleList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  updatePresaleList = async (status: string) => {
    const query = new URLSearchParams({
      offset: this.presaleOffset.toString(),
      limit: (this.presaleOffset + 20).toString(),
      statuses: status,
    }).toString();
    try {
      const res = await axios.get(prefix + `pond/search?` + query);
      console.log(res.data);
      this.presaleOffset = this.presaleOffset + 20;
      this.presaleList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
