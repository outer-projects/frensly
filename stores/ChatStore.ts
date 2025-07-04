import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { IAccount, IProfile } from "../types/users";
import axios from "axios";
import { prefix } from "../utils/config";
import { toast } from "react-toastify";

@injectable()
export class ChatStore {
  @observable myChats: any[] = [];
  @observable chat: any;
  @observable messages: any[] = [];
  @observable messagesleft: number = 0;
  @observable gifOffset: number = 0;
  @observable messagesOffset: number = 0;
  @observable availabeGifs: any[] = [];
  @observable unread: number = 0;
  @observable chatAmount: Number = 0;
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getMyChats = async () => {
    try {
      const res = await axios.get(prefix + "chat/available");
      // console.log("chats:", res.data);
      if (res.data) {
        let count = res.data.reduce(
          (partialSum: any, a: any) => partialSum + a.unread,
          0
        );
        this.unread = count;
        this.myChats = res.data;
      }
    } catch (e) {
      console.log(e);
    }
  };
  @action setGifList = (gifs:any[]) =>{
    this.availabeGifs = gifs
  }
  @action removeChat = () => {
    this.chat = undefined;
  };
  @action getGifs = async (search: string) => {
    try {
      const res = await axios.get(
        `https://tenor.googleapis.com/v2/search?key=AIzaSyAeMRVWGryNMP9ssHIjRN95fDbcIWwb8Wc&q=${search}&limit=10&pos=0`
      );
      console.log(res);
      this.gifOffset = res.data.next;
      this.availabeGifs = res.data.results;
    } catch (e) {
      console.log(e);
    }
    // }
  };
  @action updateGifs = async (search: string) => {
    try {
      const res = await axios.get(
        `https://tenor.googleapis.com/v2/search?key=AIzaSyAeMRVWGryNMP9ssHIjRN95fDbcIWwb8Wc&q=${search}&limit=10&pos=${this.gifOffset}`
      );
      console.log(res);
      this.gifOffset = res.data.next;
      this.availabeGifs = [...this.availabeGifs, ...res.data.results];
    } catch (e) {
      console.log(e);
    }
    // }
  };
  @action setMessagesLeft = (left: number) => {
    this.messagesleft = left;
  };
  @action getChat = async (id: string) => {
    const query = new URLSearchParams({
      offset: "50",
      limit: "50",
    }).toString();
    try {
      const res = await axios.get(
        prefix + "chat/room/" + id + "/?" + query
      );
      // console.log("chat:", res.data);
      const n = Number(res.data.total);
      this.messagesleft = n - 50 > 0 ? n - 50 : 0;
      this.messagesOffset = 100;
      this.chat = res.data.room;
      this.chatAmount = Number(res?.data?.room?.ownerShareAmount || res?.data?.room?.profile?.ownerShareAmount) / 10 ** 6;
      this.messages = res.data.room.messages.filter((el: any) => !el?.isHidden);
    } catch (e) {
      console.log(e);
    }
  };
  @action setNewMessage = (newMsg: any) => {
    this.messages = [...this.messages, newMsg];
  };
  @action updateChat = async (id: string) => {
    const query = new URLSearchParams({
      offset: this.messagesleft >= 50 ? this.messagesOffset.toString() : "0",
      limit: this.messagesleft >= 50 ? "50" : this.messagesleft.toString(),
    }).toString();
    try {
      const res = await axios.get(
        prefix + "chat/room/" + id + "/?" + query
      );
      // console.log("chat:", res.data);
      let n = this.messagesleft;
      this.messagesleft = n - 50 > 0 ? n - 50 : 0;
      this.messagesOffset = this.messagesOffset + 50;
      this.messages = [
        ...res.data.room.messages.filter((el: any) => !el?.isHidden),
        ...this.messages,
      ];
    } catch (e) {
      console.log(e);
    }
  };
  @action clearChat = async (id: string) => {
    this.messagesOffset = 0;
    this.chat = [];
  };
  sendMessage = async (id: string, text: string, file?: File, gif?:string) => {
    const formdata = new FormData();

    formdata.append("text", text);
    file && formdata.append("file", file);
    gif && gif!=='' && formdata.append("tenor", gif);
    try {
      const res = await axios.post(prefix + "chat/message/" + id, formdata);
      // console.log("message sent:", res.data);
    } catch (e: any) {
      console.log(e?.status);
      if (e?.status == 413) {
        toast.error("Image is too large. Max size is 2mb");
      }
    }
  };
}
