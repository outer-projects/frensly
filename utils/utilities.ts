import { BigNumberish } from "ethers";
import BN from "bignumber.js";
import numeral from "numeral";
import { DateTime } from "luxon";
import axios from "axios";
import { backend, prefix } from "./config";

export function toBNJS(val: BigNumberish | number | string) {
  return new BN(val.toString());
}

export function fd(val: number | string | BN) {
  if (!val) return "";
  return numeral(val?.toString()).format("0,0[.][000000000000000000]");
}
export const innerBackend = axios.create({
  baseURL: backend + prefix,
  headers: {
    accept: "application/json",
  },
});
export const setAuthToken = () => {
  let token = localStorage.getItem("jwt");
  if (token) {
    innerBackend.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
};
BN.config({ EXPONENTIAL_AT: 100 });

export const isServer = typeof window === "undefined";

export const addressSlice = (address: string | undefined) => {
  if (!address) return "0000...0000";
  return (
    address.slice(0, 4) +
    "..." +
    address.slice(address.length - 4, address.length)
  );
};
export const ipfsGateway = (cid?: string) => {
  // console.log(cid)
  if (cid) {
    let com = "img-quality=30&";
    let handleCid = cid.replace("ipfs://", "").replace("ipfs:/", "");
    return `https://loot.mypinata.cloud/ipfs/${handleCid}?${com}pinataGatewayToken=tda9_4KZmY8KtgTMaz5LQ3fGHhh_WEfdRzJowpHsF_2t7VTU2zHsjskO7-PWCZoV`;
  } else return "";
};
export const getDate = (date: any) => {
  const dd = new Date(date).getTime();
  // console.log("%chelper.ts line:32 dd", "color: #007acc;", dd, date);
  return DateTime.fromMillis(dd).toFormat("dd.LL.yyyy");
};
export function bigNumbersToString(x: any) {
  let num = x;
  num.toLocaleString("fullwide", { useGrouping: false });
  return num;
}
