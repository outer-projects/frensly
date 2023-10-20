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
  @observable feed: IPost[] = [];
  @observable userPosts: IPost[] = [];
  @observable currentPost?: IPost = undefined;
  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action getFeed = async () => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "100",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts?" + query);
      // console.log(res.data);
      this.feed = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getCurrentPost = async (id: string) => {
    try {
      const res = await axios.get(prefix + "social/post/" + id);
      // console.log(res.data);
      // this.currentPost = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  @action getUserPosts = async (id: string) => {
    const query = new URLSearchParams({
      offset: "0",
      limit: "100",
    }).toString();
    try {
      const res = await axios.get(prefix + "social/posts/" + id + "?" + query);
      // console.log(res.data);
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
        this.getUserPosts(data.id);
      } else {
        this.getFeed();
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
