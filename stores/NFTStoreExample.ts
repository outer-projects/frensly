import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import axios from "axios";
import { planetContract } from "../utils/contracts/planetNFT";
import { moralisUrl, network } from "../utils/config";
import { charactersContract } from "../utils/contracts/charactersNFT";
import Web3 from "web3";

@injectable()
export class NFTStore {
  @observable planets: any[] = [];
  @observable teamContract: any = undefined;
  @observable characters: any[] = [];
  @observable init: boolean = false;

  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  //get user data

  @action removeNFTs = async (type: string, list: string[]) => {
    list.map((el: string) => {
      return this.removeNFT(el, type);
    });
  };

  @action removeNFT = async (id: string, type: string) => {
    if (type == "char") {
      let index = this.characters.findIndex((el) => el.id == id);
      this.characters.splice(index, 1);
    }
    if (type == "planet") {
      let index = this.planets.findIndex((el) => el.id == id);
      this.planets.splice(index, 1);
    }
  };


  @action resyncMetadata = async (id: string, type: string) => {
    let random = id.slice(-1) + "000";
    let contract = type == "planet" ? planetContract : charactersContract;
    try {
      let call = async () => {
        await this.moralisRequestResync(id, contract).then((res) => {
          setTimeout(() => {
            if (!res) return call();
            const getInfo = async () => {
              let info = await this.moralisRequest(Number(id), contract);
              console.log(info);
              if (info && type == "planet") {
                let ind2 = this.planets.findIndex((el) => el.id == id);
                this.planets[ind2] = { ...this.planets[ind2], ...info.data.result[0].normalized_metadata};
              } else if (info && type == "character") {
                let ind = this.characters.findIndex((el) => el.id == id);
                this.characters[ind] = { ...this.characters[ind], ...info.data.result[0].normalized_metadata};
              } else {
                setTimeout(() => {
                  getInfo();
                }, Number(random));
              }
            };
            getInfo();
          }, Number(random));
        });
      };
      call();
    } catch (e: any) {
      console.log(e?.status);
    }
  };

  @action getPlanets = async (
    address: string,
    chain: string,
    isSecond?: boolean,
    cursor?: string
  ) => {
    const paramsSecond = {
      chain: chain,
      offset: "1",
      normalizeMetadata: "true",
      token_addresses: planetContract,
      cursor: cursor,
    };
    const params = {
      chain: chain,
      offset: "1",
      normalizeMetadata: "true",
      token_addresses: planetContract,
    };

    const query = new URLSearchParams(
      isSecond ? paramsSecond : params
    ).toString();
    try {
      const res = await axios.get(moralisUrl + address + `/nft/?` + query, {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
        },
      });
      console.log(res, res.data.result.length);
      if (!isSecond) {
        this.planets = res.data.result
          .filter((el: any) => el.token_uri)
          .map((el: any) => {
            return { id: el.token_id, ...el.normalized_metadata };
          });
      } else {
        this.planets = [
          ...this.planets,
          ...res.data.result
            // .filter((el: any) => el.token_uri)
            .map((el: any) => {
              return { id: el.token_id, ...el.normalized_metadata };
            }),
        ];
      }
      if (res.data.result.length == 100) {
        console.log("test???");
        setTimeout(() => {
          this.getPlanets(address, chain, true, res.data.cursor);
        }, 2500);
      }
    } catch (e) {
      console.log(e);
    }
  };
  @action moralisRequestResync = async (id: string, contract: string) => {
    const query = new URLSearchParams({
      chain: network,
      flag: "uri",
      mode: "async",
    }).toString();
    try {
      const info = await axios.get(
        moralisUrl + `nft/` + contract + `/${id}/metadata/resync/?` + query,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
          },
        }
      );
      return info;
    } catch (e) {
      console.log(e);
    }
  };
  @action moralisRequest = async (id: number, contract: string) => {
    const query = new URLSearchParams({
      chain: network,
      offset: "1",
      format: "decimal",
      normalizeMetadata: "true",
      disable_total: "true",
    }).toString();
    try {
      const info = await axios.get(
        moralisUrl + `nft/` + contract + `/${id}/owners/?` + query,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
          },
        }
      );
      return info;
    } catch (e) {
      console.log(e);
    }
  };

  @action getCharacters = async (
    address: string,
    chain: string,
    isSecond?: boolean,
    cursor?: string
  ) => {
    const paramsSecond = {
      chain: chain,
      offset: "1",
      normalizeMetadata: "true",
      token_addresses: charactersContract,
      cursor: cursor,
    };
    const params = {
      chain: chain,
      offset: "1",
      normalizeMetadata: "true",
      token_addresses: charactersContract,
    };
    const query = new URLSearchParams(
      isSecond ? paramsSecond : params
    ).toString();

    try {
      const res = await axios.get(moralisUrl + address + `/nft/?` + query, {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
        },
      });
      console.log(res);
      if (!isSecond) {
        this.characters = res.data.result
          .filter((el: any) => el.token_uri)
          .map((el: any) => {
            return { id: el.token_id, ...el.normalized_metadata };
          });
      } else {
        this.characters = [
          ...this.characters,
          ...res.data.result
            // .filter((el: any) => el.token_uri)
            .map((el: any) => {
              return { id: el.token_id, ...el.normalized_metadata };
            }),
        ];
      }
      if (res.data.result.length == 100) {
        console.log("test???");
        setTimeout(() => {
          this.getCharacters(address, chain, true, res.data.cursor);
        }, 2500);
      }
    } catch (e) {
      console.log(e);
    }
  };
}
