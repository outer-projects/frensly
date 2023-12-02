import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";
import { IStageOne } from "../components/create/stages/stageOne";
import { StatusesEnum } from "../components/explore/launchpad/presaleList";
import { communityContract } from "../utils/contracts/community";
@injectable()
export class CommunityStore {
  @observable currentCommunity: any = undefined;
  @observable currentPresale: any = undefined;
  @observable currentWhitelist: any[] = [];
  @observable presaleList: any[] = [];
  @observable presaleOffset: number = 0;
  @observable communityList: any[] = [];
  @observable communityHolders: any[] = [];
  @observable communityHistory: any[] = [];
  @observable communityOffset: number = 0;
  @observable requestToWl: boolean = false;
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
    cover
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
    cover?: File | null;
  }) => {
    const formData = new FormData();
    formData.append("pondId", pondId.toString());
    formData.append("twitter", twitter);
    formData.append("url", url);
    formData.append("telegram", telegram);
    formData.append("discord", discord);
    formData.append("description", description);
    formData.append("name", name);
    formData.append("contract", communityContract);
    formData.append("handle", handle);
    console.log(file);
    cover && formData.append("cover", cover as Blob);
    file && formData.append("file", file as Blob);
    try {
      const res = await axios.post(prefix + "pond/customize", formData);
      return res;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getTop = async () => {
    try {
      const res = await axios.get(prefix + "pond/top/price");
      console.log(res.data);
      this.communityList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  clearPresale = () => {
    this.currentPresale = undefined;
    this.currentWhitelist = [];
    this.requestToWl = false;
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
  getHolders = async (id: string) => {
    try {
      const res = await axios.get(prefix + "pond/holders/" + id);
      console.log(res);
      this.communityHolders = res.data.pond.holders;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getHistory = async (id: string) => {
    try {
      const res = await axios.get(prefix + "pond/history/" + id);
      console.log(res);
      this.communityHistory = res.data.historyItems;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  presaleSearch = async (search: string, status: string) => {
    try {
      const res = await axios.get(
        prefix +
          `pond/search?offset=0&limit=20&status=${status}&presale=true&search=${search}`
      );
      console.log(res.data);
      this.presaleList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  communitySearch = async (search: string) => {
    console.log("object");
    try {
      const res = await axios.get(
        prefix +
          `pond/search?offset=0&limit=20&status=PUBLIC&presale=false&search=${search}`
      );
      console.log(res.data);
      this.communityList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getPresale = async (id: string) => {
    try {
      const presale = await axios.get(prefix + "pond/get/" + id);
      this.currentPresale = presale.data.pond;
      
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getWl = async (id: string, address:string) => {
    try {
      const whitelist = await axios.get(
        prefix + "pond/whitelist/applications/" + id
      );
      let wl = whitelist?.data?.pond?.whitelistApplications;
      if (wl) {
        this.requestToWl =
          wl.filter((el: any) => {
            console.log(el);
            return (
              el?.user?.address?.toLowerCase() == address?.toLowerCase() &&
              el.status == "PENDING"
            );
          }).length > 0;
        console.log(wl);
        this.currentWhitelist = wl;
      }
    } catch (e) {
      console.log(e);
    }
  }
  getCommunityList = async () => {
    try {
      const res = await axios.get(
        prefix + `pond/search?presale=false&offset=0&limit=20&status=PUBLIC`
      );
      console.log(res.data);
      this.communityOffset = 20;
      this.communityList = res.data.ponds;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  updateCommunityList = async () => {
    const query = new URLSearchParams({
      offset: this.communityOffset.toString(),
      limit: (this.communityOffset + 20).toString(),
      status: "PUBLIC",
      presale: "false",
    }).toString();
    try {
      const res = await axios.get(prefix + `pond/search?` + query);
      console.log(res.data);
      this.communityOffset = this.presaleOffset + 20;
      this.communityList = [...this.communityList, ...res.data.ponds];
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getPresaleList = async (status: string) => {
    try {
      const res = await axios.get(
        prefix + `pond/search?offset=0&presale=true&limit=20&status=${status}`
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
      status: status,
      presale: "true",
    }).toString();
    try {
      const res = await axios.get(prefix + `pond/search?` + query);
      console.log(res.data);
      this.presaleOffset = this.presaleOffset + 20;
      this.presaleList = [...this.presaleList, ...res.data.ponds];
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
