import { injectable } from "inversify";
import { RootStore } from "./RootStore";
import { action, computed, makeObservable, observable } from "mobx";
import { ModalsEnum } from "../modals";
import { IPost } from "../types/feed";
import axios from "axios";
import { prefix } from "../utils/config";

@injectable()
export class FeedStore {
  @observable feed: IPost[] = [];

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getPosts = async () => {
    try {
      const res = await axios.get(prefix + "social/posts");
      console.log(res.data);
      // this.feed = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action addPost = async (data: {
    text: string;
    originalPost?: string;
    media: File | null;
  }) => {
    const formdata = new FormData();
    formdata.append("text", data.text);
    data.originalPost && formdata.append("originalPost", data.originalPost);
    data.media && formdata.append("media", data.media);
    try {
      const res = await axios.post(prefix + "social/post", formdata);
      console.log(res);
      this.getPosts()
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
