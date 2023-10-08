import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { Signer, ethers } from "ethers";
import Web3 from "web3";
import { frenslyAbi, frenslyContract } from "../utils/contracts/frensly";
import jwtDecode from "jwt-decode";
import { WalletClient } from "wagmi";
import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { innerBackend, setAuthToken } from "../utils/utilities";

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
    this.socketWeb3 = new Web3(process.env.NEXT_PUBLIC_SOCKET_NODE);

    this.frensly = new this.web3.eth.Contract(
      frenslyAbi as any,
      frenslyContract
    );
  };
  @action setAuthStatus = (auth: AuthenticationStatus) => {
    this.authStatus = auth;
  };

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
  @action auth = async () => {
    try {
      const { data } = await axios.get(
        `https://frensly.adev.co/api/v1/eauth/${this.address}`,
        {
          withCredentials: true,
        }
      );
      this.setAuthStatus("loading");
      const jwtTTL = localStorage.getItem("jwtTTL");
      const isTokenExpired = parseInt(`${jwtTTL}`) < Date.now();
      if (
        (this.web3 && isTokenExpired) ||
        !localStorage.getItem("jwt") ||
        this.address != localStorage.getItem("address")
      ) {
        const signature = await this.web3?.eth.personal.sign(
          this.web3?.utils.utf8ToHex(
            `For login to the site, I sign this random data: ${data}`,
          ),
          this.address as string,
          data
        );
        // console.log(message, signature);
        const res = await axios.get(
          `https://frensly.adev.co/api/v1/eauth/${data
            ?.toString()
            .trim()}/${signature?.toString().trim()}`,
          { withCredentials: true }
        );

        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("address", this.address as string);
        const decodedData = jwtDecode<{ exp: number }>(res.data.token);

        localStorage.setItem("jwtTTL", (decodedData.exp * 1000).toString());
        this.setAuthStatus("authenticated");
        return res.data.token;
      } else {
        this.setAuthStatus("authenticated");
      }
    } catch (error) {
      console.error(error);
      this.setAuthStatus("unauthenticated");
    }
  };
  @action checkAuth = async () => {
    try {
      setAuthToken();
      const res = await innerBackend.get("user", {
        withCredentials: true,
      });
      this.setAuthStatus("authenticated");
      return true;
    } catch (e) {
      console.log(e);
      this.setAuthStatus("unauthenticated");
      return false;
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
      this.checkAuth().then((res) => {
        if (!res || !localStorage.getItem('jwt')) {
          this.auth();
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
