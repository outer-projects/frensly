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
  @observable active: number = 0;
  @observable profileUser?: IProfile = undefined;
  @observable portfolioValue?: number = 0;
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
  @action getShares = async (id: string) => {
    try {
      const res = await axios.get(prefix + "user/shares/" + id);
      console.log(res.data);
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
      console.log(res.data);
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
