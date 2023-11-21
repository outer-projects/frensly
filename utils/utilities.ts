import { BigNumberish } from "ethers";
import BN, { BigNumber } from "bignumber.js";
import numeral from "numeral";
import { DateTime } from "luxon";
import axios from "axios";
import { fromWei } from "web3-utils";

export function toBNJS(val: BigNumberish | number | string) {
  if (val) {
    return new BN(val?.toString());
  } else {
    return new BN(0);
  }
}
interface ITime {
  year: number;
  month: number;
  week: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
export function fd(val: number | string | BN) {
  if (!val) return "";
  return numeral(val?.toString()).format("0,0[.][000000000000000000]");
}
export const fromWeiToEth = (num: string | BigNumber, fixed?: number) => {
  if (!isNaN(Number(num))) {
    return Number(Number(fromWei(num.toString(), "ether")).toFixed(fixed || 5));
  } else {
    return 0;
  }
};
BN.config({ EXPONENTIAL_AT: 100 });
export const timeToDate = (time: string) => {
  const to = Date.parse(time);
  const dateNow = Date.now();
  var d = Math.abs(dateNow - to) / 1000;
  var r: ITime = {
    year: 0,
    month: 0,
    week: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };
  var s: ITime = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
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

  if (r.year !== 0) return r.year + "y";
  if (r.month !== 0) return r.month + "m";
  if (r.week !== 0) return r.week + "w";
  if (r.day !== 0) return r.day + "d";
  if (r.hour !== 0) return r.hour + "h";
  if (r.minute !== 0) return r.minute + "m";
  if (r.second !== 0) return r.second + "s";
};
export const timePassed = (time: string) => {
  const from = Date.parse(time);
  const dateNow = Date.now();
  var d = Math.abs(from - dateNow) / 1000;
  var r: ITime = {
    year: 0,
    month: 0,
    week: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };
  var s: ITime = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
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

  if (r.year !== 0) return r.year + "y";
  if (r.month !== 0) return r.month + "m";
  if (r.week !== 0) return r.week + "w";
  if (r.day !== 0) return r.day + "d";
  if (r.hour !== 0) return r.hour + "h";
  if (r.minute !== 0) return r.minute + "m";
  if (r.second !== 0) return r.second + "s";
};
export const shortNick = (nick?: string, length?: number) => {
  let le = length ? length : 25;
  return nick ? (nick?.length >= le ? nick?.slice(0, le) + "..." : nick) : "";
};
export const isServer = typeof window === "undefined";
export const USDEthPair = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    // console.log(res.data);
    return Number(res.data.ethereum.usd);
  } catch (e) {
    console.log(e);
  }
};
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

export const getDateTime = (date: any) => {
  const dd = new Date(date).getTime();
  // console.log("%chelper.ts line:32 dd", "color: #007acc;", dd, date);
  return DateTime.fromMillis(dd).toFormat("yy LL dd hh:mm a");
};
export const getDate = (date: any) => {
  const dd = new Date(date).getTime();
  // console.log("%chelper.ts line:32 dd", "color: #007acc;", dd, date);
  return DateTime.fromMillis(dd).toFormat("hh:mm a");
};
export function bigNumbersToString(x: any) {
  let num = x;
  num.toLocaleString("fullwide", { useGrouping: false });
  return num;
}
