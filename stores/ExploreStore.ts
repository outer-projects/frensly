import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";

@injectable()
export class ExploreStore {
  @observable topUsersList: IAccount[] = [];
  @observable currentUserList: IAccount[] = [];
  @observable newUsersList: IAccount[] = [];
  @observable searchResult: IAccount[] = [];
  @observable filterGlobal: { rangeFrom: number; rangeTo: number } = {
    rangeFrom: 0,
    rangeTo: 8,
  };
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getNewUsers = async () => {
    const query = new URLSearchParams({
      offset: "1",
      limit: "10",
    }).toString();
    try {
      const res = await axios.get("newest/?" + query);
      this.topUsersList = res.data;
      this.currentUserList = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action searchUsers = async (search: string) => {
    try {
      const res = await axios.get("search/" + search);
      this.topUsersList = res.data;
      this.currentUserList = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getTopUsers = async () => {
    const query = new URLSearchParams({
      offset: "1",
      limit: "10",
    }).toString();
    try {
      const res = await axios.get("top/?" + query);
      this.topUsersList = res.data;
      this.currentUserList = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action clearFilter = () => {
    this.filterGlobal = { rangeFrom: 0, rangeTo: 8 };
  };
}
