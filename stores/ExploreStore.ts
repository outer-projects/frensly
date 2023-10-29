import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";

@injectable()
export class ExploreStore {
  @observable topUsersList: IProfile[] = [];
  @observable currentUserList: string = "";
  @observable newUsersList: IProfile[] = [];
  @observable globalActivity: any[] = [];
  @observable searchResult: IProfile[] = [];
  @observable newOffset: number = 0;
  @observable activityOffset: number = 0;
  @observable filterGlobal: { rangeFrom: number; rangeTo: number } = {
    rangeFrom: 0,
    rangeTo: 8,
  };
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action updateNewUsers = async () => {
    const query = new URLSearchParams({
      offset: this.newOffset.toString(),
      limit: "20",
    }).toString();
    try {
      const res = await axios.get(prefix + "user/newest/?" + query);
      this.newOffset = this.newOffset + 20;
      this.newUsersList = [...this.newUsersList, ...res.data];
      this.currentUserList = "new";
    } catch (e) {
      console.log(e);
    }
  };
  @action getNewUsers = async () => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "20",
    }).toString();
    try {
      const res = await axios.get(prefix + "user/newest/?" + query);
      this.newUsersList = res.data;
      this.newOffset = 20;
      this.currentUserList = "new";
    } catch (e) {
      console.log(e);
    }
  };
  @action getGlobalActivity = async () => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "20",
    }).toString();
    try {
      const res = await axios.get(prefix + "user/activity/global/?" + query);
      this.globalActivity = res.data;
      this.activityOffset = 20;
    } catch (e) {
      console.log(e);
    }
  };
  @action updateGlobalActivity = async () => {
    const query = new URLSearchParams({
      offset: this.activityOffset.toString(),
      limit: "20",
    }).toString();
    try {
      const res = await axios.get(prefix + "user/activity/global/?" + query);
      this.globalActivity = [...this.globalActivity, ...res.data];
      this.activityOffset = this.activityOffset + 20;
    } catch (e) {
      console.log(e);
    }
  };
  @action searchUsers = async (search: string) => {
    try {
      const res = await axios.get(prefix + "user/search/" + search);
      // console.log(res.data.byAddress.concat(res.data.byNames));
      const result = res.data
        ? res.data.byAddress
            .concat(res.data.byNames)
            .filter(
              (value: any, index: number, self: any) =>
                index ===
                self.findIndex((t: any) => t.twitterId === value.twitterId)
            )
        : [];
      this.searchResult = result;
    } catch (e) {
      console.log(e);
    }
  };
  @action getTopUsers = async () => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "20",
    }).toString();
    try {
      const res = await axios.get(prefix + "user/top/?" + query);
      this.topUsersList = res.data;
      this.currentUserList = "top";
    } catch (e) {
      console.log(e);
    }
  };
  @action clearFilter = () => {
    this.filterGlobal = { rangeFrom: 0, rangeTo: 8 };
  };
}
