import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { Signer, ethers } from "ethers";
import Web3 from "web3";
import {
  frenslyAbi,
  frenslyContract,
  frenslyContractDev,
  // frenslyContractDevNew,
} from "../utils/contracts/frensly";
import { WalletClient } from "wagmi";
import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { isDevelopment, prefix } from "../utils/config";
import { IProfile } from "../types/users";
import {
  communityAbi,
  communityContract,
  communityContractDev,
} from "../utils/contracts/community";

@injectable()
export class Web3Store {
  @observable init: boolean = false;
  @observable authSummaryCheck: boolean = false;
  @observable address: undefined | string = undefined;
  @observable connected: boolean = false;
  @observable provider?: Web3 = undefined;
  @observable unsupported?: boolean;
  @observable user?: IProfile;
  @observable signer?: WalletClient | null = undefined;
  @observable balance: string = "0";
  @observable web3?: any;
  @observable socketWeb3?: Web3;
  @observable fee: number = 0;
  @observable authorizeOpen: boolean = false;
  @observable blockInterface: boolean = false;
  @observable frensly?: any = undefined;
  @observable frenslyNotConnected?: any = undefined;
  @observable community?: any = undefined;
  @observable communityNotConnected?: any = undefined;
  @observable authStatus: AuthenticationStatus = "unauthenticated";
  @observable needToChangeWallet: boolean = false;
  @observable checked: boolean = false;
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  @action setNeedChangeWallet = (ch: boolean) => {
    this.needToChangeWallet = ch;
  };
  @action setConnected = (connected: boolean) => {
    this.connected = connected;

    this.web3 = new Web3(
      isDevelopment ? "https://bsc-testnet.publicnode.com" : "https://mainnet.base.org"
    );
    this.socketWeb3 = new Web3(process.env.NEXT_PUBLIC_SOCKET_NODE);
    this.community = new this.web3.eth.Contract(
      communityAbi as any,
      communityContractDev
    );
    this.communityNotConnected = new this.web3.eth.Contract(
      communityAbi as any,
      communityContractDev
    );
    this.frensly = new this.web3.eth.Contract(
      frenslyAbi as any,
      isDevelopment ? frenslyContractDev : frenslyContract
    );
    this.frenslyNotConnected = new this.web3.eth.Contract(
      frenslyAbi as any,
      isDevelopment ? frenslyContractDev : frenslyContract
    );
  };
  @action setAuthStatus = (auth: AuthenticationStatus) => {
    this.authStatus = auth;
  };
  @action setAuthSummaryCheck = (auth: boolean) => {
    this.authSummaryCheck = auth;
  };
  @action setAddress = (user: any) => {
    this.address = user.address;
  };
  @action setUserBalance = (b: string) => {
    this.balance = b;
  };
  @action setUser = (user: any) => {
    this.user = user;
  };
  @action setAuthorize = (status: boolean) => {
    this.authorizeOpen = status;
  };
  disconnected = () => {
    this.address = undefined;
  };
  @action setSigner = (signer?: WalletClient | null, unsupported?: boolean) => {
    this.signer = signer;
    this.unsupported = unsupported;
    // console.log(signer, !this.checked);
    if (signer) {
      // this.checked = true;
      this.getBalance();
    }
  };
  @action subscribeProvider = () => {
    this.web3?.on("accountsChanged", () => {
      if (
        this.address?.toLowerCase() == this.user?.account?.address.toLowerCase()
      ) {
        // console.log("wallet wrong?");
        this.needToChangeWallet = false;
      } else {
        // console.log("wallet true?");
        this.needToChangeWallet = true;
      }
    });
    // provider.on("chainChanged", (chainId: string) => {
    //   setTimeout(() => {
    //     this.setExactNetId(chainId);
    //   }, 500);
    // });
  };
  @action sign = async () => {
    try {
      const { data } = await axios.get(prefix + `eauth/${this.address}`, {
        withCredentials: true,
      });
      this.setAuthStatus("loading");
      if (this.web3) {
        const signature = await this.web3?.eth.personal.sign(
          this.web3?.utils.utf8ToHex(
            `For login to the site, I sign this random data: ${data}`
          ),
          this.address as string,
          data
        );
        // console.log(message, signature);
        const res = await axios.get(
          prefix +
            `eauth/${data?.toString().trim()}/${signature?.toString().trim()}`,
          { withCredentials: true }
        );
        // console.log(res.data);
        if (res.data?.meta.message == "Succesful authentication") {
          this.checkAuth();
          this.setAuthStatus("authenticated");
          return res.data;
        } else {
          this.setAuthStatus("unauthenticated");
        }
      } else {
        this.setAuthStatus("authenticated");
      }
    } catch (error) {
      console.error(error);
      this.setAuthStatus("unauthenticated");
    }
  };
  @action setInit = (init: boolean) => {
    this.init = init;
  };
  @action checkAuth = async () => {
    try {
      const res = await axios.get(prefix + "user", {
        withCredentials: true,
      });
      this.setAuthStatus("authenticated");
      this.user = res.data;
      return res.data.account;
    } catch (e) {
      console.log(e);
      this.setAuthStatus("unauthenticated");
      return false;
    }
  };
  @action getBalance = async () => {
    try {
      this.signer && console.log(this.signer.transport);
      this.web3 = new Web3(
        window.ethereum || (isDevelopment ? "https://bsc-testnet.publicnode.com" : "https://mainnet.base.org") 
      );
      this.frensly = new this.web3.eth.Contract(
        frenslyAbi as any,
        isDevelopment ? frenslyContractDev : frenslyContract
      );
      // this.newFrensly = new this.web3.eth.Contract(
      //   frenslyAbi as any,
      //   isDevelopment ? frenslyContractDev : frenslyContractDevNew
      // );
      this.community = new this.web3.eth.Contract(
        communityAbi as any,
        isDevelopment ? communityContractDev : communityContract
      );
      this.subscribeProvider();
      this.checkAuth().then((res) => {
        if (!res) {
          this.sign();
        }
      });
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
