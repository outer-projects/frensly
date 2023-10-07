import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";

@injectable()
export class UserStore {
  @observable init: boolean = false;
  @observable user: any = undefined;
  @observable opacity: boolean = false;
  @observable active: number = 0
  @observable filterGlobal: { rangeFrom: number; rangeTo: number } = {
    rangeFrom: 0,
    rangeTo: 8,
  };
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action setOpacity = (opacity:boolean) => {
    this.opacity = opacity
  };
  @action setUser = (user:any) =>{
    this.user = user
  }
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
