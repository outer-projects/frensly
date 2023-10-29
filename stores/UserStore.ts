import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import axios from "axios";
import { prefix } from "../utils/config";
import { IAccount, IProfile } from "../types/users";
import { USDEthPair, fromWeiToEth, toBNJS } from "../utils/utilities";
import Web3 from "web3";
import BigNumber from "bignumber.js";

@injectable()
export class UserStore {
  @observable init: boolean = false;
  @observable opacity: boolean = false;
  @observable ethCurrency: number = 0;
  @observable history: any[] = [];
  @observable key: any = undefined;
  @observable inviteLimit: number = 0;
  @observable invited: number = 0;
  @observable notifications: any[] = [];
  @observable notificationsAll: any[] = [];
  @observable unreadCount: number = 0;
  @observable active: number = 0;
  @observable myActive: number = 0;
  @observable currentType: number = 2;
  @observable profileUser?: IProfile = undefined;
  @observable portfolioValue?: BigNumber;
  @observable followings?: IProfile[] = [];
  @observable followers?: IProfile[] = [];
  @observable currentRequire: any[] = [];
  @observable currentProgress: any[] = [];
  @observable finished: boolean = false;
  @observable unlimitedKeys: boolean = false;
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
  @action getCurrentTier = async () => {
    try {
      const res = await axios.get(prefix + "user/tier/requirements");
      // console.log(res.data);
      if (res.data?.requirements) {
        this.currentRequire = Object.entries(res.data.requirements);
      }
      if (res.data?.progress) {
        this.currentProgress = Object.entries(res.data.progress);
      }
      if (res.data?.canUpgrade) {
        this.upgradeTier();
      }
      if (res.data?.finished) {
        this.currentRequire = [];
        this.currentProgress = [];
        this.finished = true;
      }
    } catch (e) {
      console.log(e);
    }
  };
  @action upgradeTier = async () => {
    try {
      const res = await axios.get(prefix + "user/tier/upgrade");
      // console.log(res.data);
      this.getCurrentTier();
    } catch (e) {
      console.log(e);
    }
  };
  @action setCurrentType = async (number: number) => {
    this.currentType = number;
  };
  @action getKeys = async () => {
    try {
      const res = await axios.get(prefix + "user/user/refs");
      // console.log(res.data);
      this.unlimitedKeys = res.data.unlimited;
      this.inviteLimit = Number(res.data.usesLeft) + res.data.referrals.length;
      this.key = res.data;
      this.invited = Number(res.data.referrals.length);
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
  // @action addOneNotification = (not: any) => {
  //   this.notifications = [...this.notifications, not];
  // };
  @action getUnreadCount = async () => {
    try {
      const res = await axios.get(prefix + "user/notifications/count");
      // console.log(res);
      this.unreadCount = Number(res.data.count);
    } catch (e) {
      console.log(e);
    }
  };
  @action getAllNotifications = async () => {
    try {
      const res = await axios.get(prefix + "user/notifications/all");
      // console.log("All notifications:", res);
      this.notificationsAll = res.data;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  @action getNotifications = async () => {
    try {
      const res = await axios.get(prefix + "user/notifications/unread");
      // console.log(res);
      this.notifications = res.data;
      return true;
    } catch (e) {
      console.log(e);
      return false;
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
        prefix + "user/history/account/" + id + "?" + query?.toString()
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
          toBNJS(partialSum)
            .plus(
              toBNJS(a?.subject?.currentPrice).multipliedBy(
                (Number(a.amount) / 10 ** 6).toFixed(2)
              )
            )
            .toFixed(0),
        "0"
      );
      this.shares = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getFollowers = async (id: string) => {
    try {
      const res = await axios.get(prefix + "user/followers/" + id);
      // console.log("getFollowers:", res);
      this.followers = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getFollowings = async (id: string) => {
    try {
      const res = await axios.get(prefix + "user/following/" + id);
      // console.log("getFollowings:", res);
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
  @action setMyActive = (active: number) => {
    this.myActive = active;
  };
  @action setFilter = (filter: { rangeFrom: number; rangeTo: number }) => {
    this.filterGlobal = filter;
  };
  @action clearFilter = () => {
    this.filterGlobal = { rangeFrom: 0, rangeTo: 8 };
  };
}
