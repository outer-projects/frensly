import { Container } from "inversify";
import { UserStore } from "./UserStore";
import { ModalStore } from "./ModalStore";
import { useMemo } from "react";
import WalletStore from "./Web3Store";
import { ExploreStore } from "./ExploreStore";
import { FeedStore } from "./FeedStore";
import { ChatStore } from "./ChatStore";

export class RootStore {
  public userStore: UserStore;
  public container: Container;
  public modalStore: ModalStore;
  public walletStore: WalletStore;
  public exploreStore: ExploreStore;
  public feedStore: FeedStore;
  public chatStore: ChatStore;
  public constructor() {
    this.userStore = new UserStore(this);
    this.modalStore = new ModalStore(this);
    this.walletStore = new WalletStore(this);
    this.exploreStore = new ExploreStore(this);
    this.feedStore = new FeedStore(this);
    this.chatStore = new ChatStore(this);
    this.container = new Container();
    this.container.bind(UserStore).toConstantValue(this.userStore);
    this.container.bind(ModalStore).toConstantValue(this.modalStore);
    this.container.bind(WalletStore).toConstantValue(this.walletStore);
    this.container.bind(ExploreStore).toConstantValue(this.exploreStore);
    this.container.bind(FeedStore).toConstantValue(this.feedStore);
    this.container.bind(ChatStore).toConstantValue(this.chatStore);
    this.container.bind(Container).toConstantValue(this.container);
  }
}

function initializeStore(initialData: unknown = null) {
  let store;
  const _store = store ?? new RootStore();
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;
  return _store;
}

export function useStore(initialState?: unknown) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
