import { IPost } from "./feed";

export interface IAccount {
  address: string;
  isInitialized: boolean;
  initDate: Date;
  myHolders: string[];
  networth: string;
  holderNetworth: string;
  currentPrice: string;
  profile: IProfile;
  history: IHistory[]; 
  sharesAmount: string;
  subjectFee: number;
  holderFee: number;
  holderFeeClaimed: string;
  subjectFeeClaimed: string; 
  holderFeeDistributed: string; 
  totalVolume: string; 
  _id: string;
  othersShares: {
 
    subject: string; 
    amount: string; 
    isEligible: boolean; 
  }[];
}
export interface IProfile {
  verified?: boolean;
  account: IAccount;
  twitterId: string;
  tier: number;
  points: number;
  hasReceivedPoints: boolean;
  requireManualPointsUpdate: boolean;
  avatar: string;
  twitterName: string;
  role: string;
  posts: string[];
  twitterHandle: string;
  twitterDescription: string;
  regDate: Date;
  earlyAdopter?: boolean;
  isKeyConfirmed?: boolean;
  _id: string;
  isFollowing: string[];
  isFollowedBy: string[];
}

export enum HistoryTypes {
  BUY = "BUY",
  SELL = "SELL",
  OWN_BUY = "OWN_BUY",
  OWN_SELL = "OWN_SELL",
  CLAIM = "CLAIM",
  INIT = "INIT",
  ELIGIBLE = "ELIGIBLE",
  NON_ELIGIBLE = "NON_ELIGIBLE",
  COMMENT = "COMMENT",
  REPOST = "REPOST",
  MENTION = "MENTION",
  REPLY = "REPLY",
  LIKE = "LIKE",
  FOLLOW = "FOLLOW",
  POND_CREATION = "POND_CREATION",
  POND_BUY = "POND_BUY",
  POND_SELL = "POND_SELL",
  WHITELIST_REQUEST = "WHITELIST_REQUEST",
  WHITELIST_ACCEPT = "WHITELIST_ACCEPT",
  WHITELIST_REJECT = "WHITELIST_REJECT",
  POND_SUCCESS = "POND_SUCCESS",
  POND_FAIL = "POND_FAIL",
}

export interface IHistory extends Document {

  date: Date;
  type: HistoryTypes; 
  price: string; 
  amount: string; 
  subject: IAccount[]; 
  account: IAccount[]; 
}
