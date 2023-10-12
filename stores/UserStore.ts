import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import axios from "axios";
import { prefix } from "../utils/config";
import { IProfile } from "../types/users";

@injectable()
export class UserStore {
  @observable init: boolean = false;
  @observable opacity: boolean = false;
  @observable active: number = 0;
  @observable profileUser?: IProfile = undefined;
  @observable filterGlobal: { rangeFrom: number; rangeTo: number } = {
    rangeFrom: 0,
    rangeTo: 8,
  };
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getProfileUser = async (id: string) => {
    try {
      let res = await axios.get(prefix + "user/" + id);
      this.profileUser = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action follow = async (id: string, isFollowed:boolean) => {
    try {
      let res = await axios.get(prefix + `social/${isFollowed ? 'un' : ''}follow/` + id);
      console.log(res.data)
      return true
    } catch (e) {
      console.log(e);
      return false
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
