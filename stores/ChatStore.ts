import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";

@injectable()
export class ChatStore {
  @observable myChats: any[] = [];
  @observable chat: any
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getMyChats = async () => {
    try {
      const res = await axios.get(prefix + "chat/available");
      console.log("chats:", res.data);
      this.myChats = res.data.rooms;
    } catch (e) {
      console.log(e);
    }
  };
  @action removeChat = () =>{
    this.chat = undefined
  }
  @action getChat = async (id:string) => {
    try {
      const res = await axios.get(prefix + "chat/room/" + id);
      console.log("chat:", res.data);
      this.chat = res.data.room;
    } catch (e) {
      console.log(e);
    }
  }
  sendMessage = async (id:string, text:string, file?:File) => {
    const formdata = new FormData();
    formdata.append("text", text);
    file && formdata.append("file", file);
    try {
      const res = await axios.post(prefix + "chat/message/" + id);
      console.log("message sent:", res.data);
      
    } catch (e) {
      console.log(e);
    }
  }
}
