import { Container } from 'inversify'
import { UserStore } from './UserStore'
import { ModalStore } from './ModalStore'
import { useMemo } from 'react'
import WalletStore from "./Web3Store";
import { NFTStore } from './NFTStore';


export class RootStore {
    public userStore: UserStore
    public container: Container
    public modalStore: ModalStore
    public walletStore: WalletStore;
    public nftStore: NFTStore;
    public constructor() {
        this.userStore = new UserStore(this)
        this.modalStore = new ModalStore(this)
        this.walletStore = new WalletStore(this);
        this.nftStore = new NFTStore(this);
        this.container = new Container()
        this.container.bind(UserStore).toConstantValue(this.userStore)
        this.container.bind(ModalStore).toConstantValue(this.modalStore)
        this.container.bind(WalletStore).toConstantValue(this.walletStore);
        this.container.bind(NFTStore).toConstantValue(this.nftStore);
        this.container.bind(Container).toConstantValue(this.container)
    }
}

function initializeStore(initialData: unknown = null) {
    let store
    const _store = store ?? new RootStore()
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
    return _store
}

export function useStore(initialState?: unknown) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
