import { BigNumberish } from "ethers";
import BN from "bignumber.js";
import numeral from "numeral";
import { DateTime } from "luxon";
import axios from "axios";
import { backend, prefix } from "./config";
import { fromWei } from "web3-utils";

export function toBNJS(val: BigNumberish | number | string) {
  return new BN(val.toString());
}

export function fd(val: number | string | BN) {
  if (!val) return "";
  return numeral(val?.toString()).format("0,0[.][000000000000000000]");
}
export const fromWeiToEth = (num: number | string, fixed?: number) => {
  return Number(Number(fromWei(Number(num), "ether")).toFixed(fixed || 5));
};
BN.config({ EXPONENTIAL_AT: 100 });
export const timePassed = (time:string) => {
  const from = Date.parse(time); 
  const dateNow = Date.now()
  var d = Math.abs(from - dateNow) / 1000; // delta
  var r = {}; // result
  var s = {
    // structure
    year: 31536000,
    month: 2592000,
    week: 604800, // uncomment row to ignore
    day: 86400, // feel free to add your own row
    hour: 3600,
    minute: 60,
    second: 1,
  };

  Object.keys(s).forEach(function (key) {
    //@ts-ignore
    r[key] = Math.floor(d / s[key]);
        //@ts-ignore
    d -= r[key] * s[key];
  });

  // for example: {year:0,month:0,week:1,day:2,hour:34,minute:56,second:7}
  console.log(r);
  return r
};

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
