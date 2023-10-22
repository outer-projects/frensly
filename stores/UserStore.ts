import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import axios from "axios";
import { prefix } from "../utils/config";
import { IAccount, IProfile } from "../types/users";
import { USDEthPair, fromWeiToEth } from "../utils/utilities";

@injectable()
export class UserStore {
  @observable init: boolean = false;
  @observable opacity: boolean = false;
  @observable ethCurrency: number = 0;
  @observable history: any[] = [];
  @observable keys: any[] = [];
  @observable notifications: any[] = [];
  @observable active: number = 0;
  @observable currentType: number = 2;
  @observable profileUser?: IProfile = undefined;
  @observable portfolioValue?: number = 0;
  @observable followings?: IProfile[] = [];
  @observable followers?: IProfile[] = [];
  @observable holders?: {
    user: IAccount;
    amount: string;
  }[] = [];
  @observable shares?: {
    subject: IAccount;
    amount: string;
  }[] = [];
  @observable filterGlobal: { rangeFrom: number; rangeTo: number } = {
    rangeFrom: 0,
    rangeTo: 8,
  };
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action setCurrentType = async (number: number) => {
    this.currentType = number;
  };
  @action getKeys = async () => {
    try {
      const res = await axios.get(prefix + "user/user/keys");
      // console.log(res.data);
      this.keys = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action sendInviteCode = async (key: string) => {
    try {
      const res = await axios.post(prefix + "user/key/" + key);
      // console.log(res.data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  @action addOneNotification = (not:any) =>{
    this.notifications = [...this.notifications, not]
  }
  @action getNotifications = async (id: string) => {

    try {
      const res = await axios.get(
        prefix + "user/notifications" 
      );
      // console.log(res.data);
      this.notifications = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getHistory = async (id: string) => {
    const query = new URLSearchParams();
    query.append("types", "SELL");
    query.append("types", "BUY");
    query.append("types", "INIT");
    // query.append("types", "COMMENT");
    // query.append("types", "REPOST");
    // query.append("types", "MENTION");
    // query.append("types", "REPLY");
    try {
      const res = await axios.get(
        prefix + "user/history/account/" + id + "?" + query.toString()
      );
      // console.log(res.data);
      this.history = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getShares = async (id: string) => {
    try {
      const res = await axios.get(prefix + "user/shares/" + id);
      // console.log(res.data);
      this.portfolioValue = res.data.reduce(
        (partialSum: any, a: any) =>
          partialSum +
          Number(a.subject.currentPrice) * (Number(a.amount) / 1000000),
        0
      );
      this.shares = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getFollowers = async (id: string) => {
    try {
      const res = await axios.get(prefix + "user/followers/" + id);
      this.followers = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getFollowings = async (id: string) => {
    try {
      const res = await axios.get(prefix + "user/following/" + id);
      this.followings = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getHolders = async (id: string) => {
    try {
      const res = await axios.get(prefix + "user/holders/" + id);
      this.holders = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getEthCurrency = () => {
    USDEthPair().then((el) => {
      if (el) this.ethCurrency = el;
    });
  };
  @action getPriceInUsd = (price: string) => {
    const priceInEth = fromWeiToEth(price);
    return Number((this.ethCurrency * priceInEth).toFixed(2));
  };
  @action getProfileUser = async (id: string) => {
    try {
      let res = await axios.get(prefix + "user/" + id);
      this.profileUser = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action follow = async (id: string, isFollowed: boolean) => {
    try {
      let res = await axios.post(
        prefix + `social/${isFollowed ? "un" : ""}follow/` + id
      );
      // console.log(res.data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  @action clearProfileUser = () => {
    this.profileUser = undefined;
  };
  @action setOpacity = (opacity: boolean) => {
    this.opacity = opacity;
  };
  @action setInit = (init: boolean) => {
    this.init = init;
  };
  @action setActive = (active: number) => {
    this.active = active;
  };
  @action setFilter = (filter: { rangeFrom: number; rangeTo: number }) => {
    this.filterGlobal = filter;
  };
  @action clearFilter = () => {
    this.filterGlobal = { rangeFrom: 0, rangeTo: 8 };
  };
}
