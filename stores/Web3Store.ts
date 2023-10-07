import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { Signer, ethers } from "ethers";
import Web3 from "web3";
import { frenslyAbi, frenslyContract } from "../utils/contracts/frensly";

import { WalletClient } from "wagmi";
import { AuthenticationStatus } from "@rainbow-me/rainbowkit";

@injectable()
export class Web3Store {
  @observable address: undefined | string = undefined;
  @observable connected: boolean = false;
  @observable provider: any = undefined;
  @observable unsupported?: boolean;
  @observable signer?: WalletClient | null = undefined;
  @observable balance: number = 0;
  @observable web3?: Web3;
  @observable socketWeb3?: Web3;
  @observable fee: number = 0;
  @observable blockInterface: boolean = false;
  @observable frensly?: any = undefined;
  @observable authStatus: AuthenticationStatus = "unauthenticated";

  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  @action setConnected = (connected: boolean) => {
    this.connected = connected;

    this.web3 = new Web3(
      this.signer && !this.unsupported //@ts-ignore
        ? (this.signer.transport as any)
        : process.env.NEXT_PUBLIC_NODE
    );
    this.socketWeb3 = new Web3(
      process.env.NEXT_PUBLIC_SOCKET_NODE
    );

    this.frensly = new this.web3.eth.Contract(
      frenslyAbi as any,
      frenslyContract
    );

  };
  @action setAuthStatus = (auth:AuthenticationStatus) =>{
    this.authStatus = auth
  }
  @action setAddress = (transport?: any, address?:string) =>{
    this.web3 = new Web3(transport)
    this.address = address
    // this.signer = signer;
  }
  @action setUser = (user: any) => {
    this.address = user.address;
  };

  disconnected = () => {
    this.address = undefined;
  };
  @action setSigner = (signer?: WalletClient | null, unsupported?: boolean) => {
    this.signer = signer;
    this.unsupported = unsupported;
    if (signer) {
      this.getBalance();
    }
  };

  @action getBalance = async () => {
    try {
      this.web3 = new Web3(
        this.signer && !this.unsupported //@ts-ignore
          ? (this.signer.transport as any)
          : process.env.NEXT_PUBLIC_NODE
      );
      this.frensly = new this.web3.eth.Contract(
        frenslyAbi as any,
        frenslyContract
      );

      // let hexbalance =
      //   this.erc20 && (await this.erc20.methods.balanceOf(this.address).call());
      // console.log(Math.floor(Number(ethers.formatEther(hexbalance))));
      // this.balance = Math.floor(Number(ethers.formatEther(hexbalance)));
    } catch (e) {
      console.log(e);
    }

    // this.getAllowance();
  };
}

export default Web3Store;
