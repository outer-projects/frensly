import { injectable } from "inversify";
import { RootStore } from "./RootStore";
import { action, computed, makeObservable, observable } from "mobx";
import { ModalsEnum } from "../modals";
import { IPost } from "../types/feed";
import axios from "axios";
import { prefix } from "../utils/config";
import { toast } from "react-toastify";

@injectable()
export class FeedStore {
  @observable frensFeed: IPost[] = [];
  @observable publicFeed: IPost[] = [];
  @observable feed: IPost[] = [];
  @observable userPosts: IPost[] = [];
  @observable feedOffset: number = 0;
  @observable feedFrensOffset: number = 0;
  @observable publicOffset: number = 0
  @observable postOffset: number = 0;
  @observable activeFeed: number = 0;
  @observable currentPost?: IPost = undefined;
  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getFrensFeed = async () => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts/verified?" + query);
      // console.log(res.data);
      this.feedFrensOffset = 30;
      this.frensFeed = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getPublicFeed = async () => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts/all?" + query);
      // console.log(res.data);
      this.publicOffset = 30;
      this.publicFeed = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action setActiveFeed = (f:number) =>{
    localStorage.setItem('feed', f.toString())
    this.activeFeed = f
  }
  @action updatePublicFeed = async () => {
    const query = new URLSearchParams({
      offset: this.publicOffset.toString(),
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts/all?" + query);
      // console.log(res.data);
      this.publicOffset = this.publicOffset + 30;
      this.publicFeed = [...this.publicFeed, ...res.data];
    } catch (e) {
      console.log(e);
    }
  };
  @action updateFrensFeed = async () => {
    const query = new URLSearchParams({
      offset: this.feedFrensOffset.toString(),
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts/verified?" + query);
      // console.log(res.data);
      this.feedFrensOffset = this.feedFrensOffset + 30;
      this.frensFeed = [...this.frensFeed, ...res.data];
    } catch (e) {
      console.log(e);
    }
  };
  @action getFeed = async () => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts?" + query);
      // console.log(res.data);
      this.feedOffset = 30;
      this.feed = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action updateFeed = async () => {
    const query = new URLSearchParams({
      offset: this.feedOffset.toString(),
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts?" + query);
      // console.log(res.data);
      this.feedOffset = this.feedOffset + 30;
      this.feed = [...this.feed, ...res.data];
    } catch (e) {
      console.log(e);
    }
  };
  @action clearUserPosts = () => {
    this.userPosts = [];
  };
  @action setCurrentPost = (post: any) => {
    this.currentPost = post;
  };
  @action getCurrentPost = async (id: string) => {
    try {
      const res = await axios.get(prefix + "social/post/" + id);
      // console.log(res.data);
      this.currentPost = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action setPostOffset = (n: number) => {
    this.postOffset = n;
  };
  @action updateUserPosts = async (id: string) => {
    const query = new URLSearchParams({
      offset: this.postOffset.toString(),
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts/" + id + "?" + query);
      // console.log(res.data);
      this.setPostOffset(this.postOffset + 30);
      this.userPosts = [...this.userPosts, ...res.data];
    } catch (e) {
      console.log(e);
    }
  };
  @action getUserPosts = async (id: string) => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "30",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts/" + id + "?" + query);
      // console.log(res.data);
      this.setPostOffset(30);
      this.userPosts = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action clearPosts = () => {
    this.userPosts = [];
  };
  @action likePost = async (
    id: string,
    userId?: string,
    isProfile?: boolean
  ) => {
    try {
      const res = await axios.post(prefix + "social/like/" + id);
      // console.log(res.data);
      if (!isProfile) {
        const ind = this.feed.findIndex((el) => el._id == id);
        const likeInd = this.feed[ind].likes.findIndex((el) => el == userId);
        if (ind !== -1 && likeInd == -1) {
          this.feed[ind] = {
            ...this.feed[ind],
            likes: [...this.feed[ind].likes, userId as string],
          };
        } else {
          this.feed[ind] = {
            ...this.feed[ind],
            likes: [...this.feed[ind].likes.splice(likeInd, 1)],
          };
        }
      }

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
      this.getFeed();
      // console.log(res.data);
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
    isVerified?: boolean;
  }) => {
    const formdata = new FormData();
    formdata.append("text", data.text);
    data.originalPost && formdata.append("originalPost", data.originalPost);
    // console.log(data.media);
    data.media && formdata.append("file", data.media);
    try {
      const res = await axios.post(prefix + "social/post", formdata);
      // console.log(res);
      if (data.id) {
        this.userPosts = [res.data, ...this.userPosts];
      } else {
        this.feed = [res.data, ...this.feed];
        this.publicFeed = [res.data, ...this.publicFeed]
      }
      if (data.isVerified) {
        this.frensFeed = [res.data, ...this.frensFeed];
      }
      data.originalPost && this.getCurrentPost(data.originalPost);
      return true;
    } catch (e) {
      console.log(e);
      // toast.error('Image is t')
      return false;
    }
  };
}
