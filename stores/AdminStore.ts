import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";
import { toast } from "react-toastify";

@injectable()
export class AdminStore {
  //   @observable myChats: any[] = [];

  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action makeAdmin = async (handle: string) => {
    try {
      const res = await axios.post(prefix + "user/admin/grant", {
        twitterHandle: handle,
      });
      toast.success("Rights gained");
      console.log("verify:", res.data);
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };
  @action verify = async (handle: string, code: string) => {
    try {
      const res = await axios.post(prefix + "user/admin/verify", {
        twitterHandle: handle,
        code: code,
      });
      toast.success("Verified");
      console.log("verify:", res.data);
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };
  @action createCodes = async (keys: string[]) => {
    try {
      const res = await axios.post(prefix + "user/keys/generate", {
        keys: keys,
      });
      toast.success("Codes added");
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };
}
