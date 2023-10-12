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
  @observable userPosts: IPost[] = [];
  @observable currentPost?: IPost = undefined;
  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getFeed = async () => {
    try {
      const res = await axios.get(prefix + "social/posts");
      console.log(res.data);
      this.feed = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getCurrentPost = async (id: string) => {
    try {
      const res = await axios.get(prefix + "social/post/" + id);
      console.log(res.data);
      this.currentPost = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getUserPosts = async (id: string) => {
    try {
      const res = await axios.get(prefix + "social/posts/" + id);
      console.log(res.data);
      this.userPosts = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action likePost = async (id: string) => {
    try {
      const res = await axios.post(prefix + "social/like/" + id);
      console.log(res.data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  @action deletePost = async (id: string) => {
    try {
      await axios.delete(prefix + "social/post/" + id);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  @action repostPost = async (id: string) => {
    try {
      const res = await axios.post(prefix + "social/repost/" + id);
      this.getFeed()
      console.log(res.data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  @action addPost = async (data: {
    text: string;
    originalPost?: string;
    media: File | null;
    id?: string;
  }) => {
    const formdata = new FormData();
    formdata.append("text", data.text);
    data.originalPost && formdata.append("originalPost", data.originalPost);
    data.media && formdata.append("media", data.media);
    try {
      const res = await axios.post(prefix + "social/post", formdata);
      console.log(res);
      if (data.id) {
        this.getUserPosts(data.id)
      } else {
        this.getFeed();
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
