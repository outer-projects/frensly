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
    @observable pointsInfo: any = undefined;

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
  @action getAdminPoints = async () => {
    try {
      const res = await axios.get(prefix + "user/admin/pointstats");
      console.log("verify:", res.data);
      this.pointsInfo = res.data;
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
  @action unban = async (handle: string) => {
    try {
      const res = await axios.post(prefix + "user/admin/unban", {
        twitterHandle: handle,
      });
      toast.success("unbaned");
      console.log("unbaned:", res.data);
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };
  @action ban = async (handle: string) => {
    try {
      const res = await axios.post(prefix + "user/admin/ban", {
        twitterHandle: handle,
      });
      toast.success("banned");
      console.log("banned:", res.data);
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };
  @action unverify = async (handle: string) => {
    try {
      const res = await axios.post(prefix + "user/admin/unverify", {
        twitterHandle: handle,
      });
      toast.success("unverified");
      console.log("unverified:", res.data);
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
