import { observable, action, makeObservable } from "mobx";
import { injectable } from "inversify";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import { Signer, ethers } from "ethers";
import { erc20abi, erc20contract } from "../utils/contracts/erc20";
import {
  charactersAbi,
  charactersContract,
} from "../utils/contracts/charactersNFT";
import Web3 from "web3";
import { network } from "../utils/config";
import { bigNumbersToString } from "../utils/utilities";
import { planetAbi, planetContract } from "../utils/contracts/planetNFT";
import { gameAbi, gameContract } from "../utils/contracts/game";
import {
  priceGetterAbi,
  priceGetterContract,
} from "../utils/contracts/priceGetter";
import { WalletClient } from "wagmi";

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
  @observable erc20?: any = undefined;
  @observable fee: number = 0;
  @observable blockInterface: boolean = false;
  @observable charactersNFT?: any = undefined;
  @observable planetNFT?: any = undefined;
  @observable game?: any = undefined;
  @observable charsAllowance?: string = "0";
  @observable mechaAllowance?: string = "0";
  @observable priceGetter?: any = undefined;

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
    this.erc20 = new this.web3.eth.Contract(erc20abi as any, erc20contract);

    this.charactersNFT = new this.web3.eth.Contract(
      charactersAbi as any,
      charactersContract
    );
    this.planetNFT = new this.web3.eth.Contract(
      planetAbi as any,
      planetContract
    );
    this.priceGetter = new this.web3.eth.Contract(
      priceGetterAbi as any,
      priceGetterContract
    );
    this.game = new this.web3.eth.Contract(gameAbi as any, gameContract);
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

  @action mintWithAllowance = async (
    type: string,
    price: number,
    amount: number,
    afterMint: (type: string, minted: any, count: number) => void
  ) => {
    try {
      let currentContractAddress =
        type == "planets" ? planetContract : charactersContract;
      const allowance = await this.erc20.methods
        .allowance(this.address, currentContractAddress)
        .call();
      console.log(
        Number(allowance),
        price * (amount + 0.05),
        bigNumbersToString(price * (amount + 0.05)).toString()
      );
      if (Number(allowance) >= price * amount + 0.05) {
        this.mint(amount, type, afterMint, currentContractAddress);
      } else {
        const estimation = await this.erc20?.methods
          .approve(
            currentContractAddress,
            bigNumbersToString(price * (amount + 0.05)).toString()
          )
          .estimateGas({
            gasLimit: 500000000000,
            from: this.address,
          });

        await this.erc20?.methods
          .approve(
            currentContractAddress,
            bigNumbersToString(price * (amount + 0.2)).toString()
          )
          .send({
            gasLimit: Number(estimation) * 3,
            from: this.address,
          })
          .on("receipt", () => {
            this.mint(amount, type, afterMint, currentContractAddress);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  @action mint = async (
    amount: number,
    type: string,
    afterMint: (type: string, minted: any, count: number) => void,
    currentContractAddress: string
  ) => {
    let currentContract =
      type == "planets" ? this.planetNFT : this.charactersNFT;
    try {
      const estimation = await currentContract?.methods
        .mint(amount)
        .estimateGas({
          gasLimit: 500000000000,
          from: this.address,
        });
      await currentContract?.methods
        .mint(amount)
        .send({
          gasLimit: Number(estimation) * 3,
          from: this.address,
        })
        .on("transactionHash", async (res: any) => {
          let tokens:any[] = []
          console.log(res);
          if (this.socketWeb3) {
            let options721 = {
              topics: [
                this.socketWeb3.utils.sha3("Transfer(address,address,uint256)"),
              ],
            };
            console.log(this.socketWeb3);
            let subscription721 = await this.socketWeb3.eth.subscribe(
              "logs",
              //@ts-ignore
              options721
            );
            subscription721.on("data", (event: any) => {
              console.log(
                res == event.transactionHash,
                currentContractAddress.toLowerCase()
              );
              if (
                res == event.transactionHash &&
                event.address.toLowerCase() ==
                  currentContractAddress.toLowerCase() &&
                event.topics.length == 4
              ) {
                console.log(event);
                let transaction = this.socketWeb3?.eth.abi.decodeLog(
                  [
                    {
                      type: "address",
                      name: "from",
                      indexed: true,
                    },
                    {
                      type: "address",
                      name: "to",
                      indexed: true,
                    },
                    {
                      type: "uint256",
                      name: "tokenId",
                      indexed: true,
                    },
                  ],
                  event.data,
                  [event.topics[1], event.topics[2], event.topics[3]]
                );
                if(amount == 1) {
                  afterMint(type, Number(transaction?.tokenId), amount);
                  subscription721?.unsubscribe();
                } else {
                  tokens.push(Number(transaction?.tokenId))
                  if(amount == tokens.length) {
                    afterMint(type, tokens, amount);
                    subscription721?.unsubscribe();
                  }
                }
                
              }
            });
          }
          // afterMint(type, res, amount);
          setTimeout(() => {
            this.getBalance();
            // getCharacters(this.address as string, network);
            // getPlanets(this.address as string, network);
          }, 4000);
        });
    } catch (e) {
      console.log(e);
    }
  };
  @action getBalance = async () => {
    try {
      this.web3 = new Web3(
        this.signer && !this.unsupported //@ts-ignore
          ? (this.signer.transport as any)
          : process.env.NEXT_PUBLIC_NODE
      );
      this.erc20 = new this.web3.eth.Contract(erc20abi as any, erc20contract);

      this.planetNFT = new this.web3.eth.Contract(
        planetAbi as any,
        planetContract
      );
      this.charactersNFT = new this.web3.eth.Contract(
        charactersAbi as any,
        charactersContract
      );
      this.game = new this.web3.eth.Contract(gameAbi as any, gameContract);
      let hexbalance =
        this.erc20 && (await this.erc20.methods.balanceOf(this.address).call());
      console.log(Math.floor(Number(ethers.formatEther(hexbalance))));
      this.balance = Math.floor(Number(ethers.formatEther(hexbalance)));
    } catch (e) {
      console.log(e);
    }

    // this.getAllowance();
  };
}

export default Web3Store;
