import { IPost } from "./feed";

export interface IAccount {
  address: string;
  isInitialized: boolean;
  initDate: Date;
  myHolders: string[];
  currentPrice: string;
  profile: IProfile; //профиль с неймами и прочей хуитой
  history: IHistory[][]; //все действия юзера
  sharesAmount: string; //сколько шеров этого юзера существует
  subjectFee: number; //% комсы в юзера
  holderFee: number; //акционерная комса
  holderFeeClaimed: string; //сколько юзер заклеймил акционерной комсы
  subjectFeeClaimed: string; //сколько комсы с трейдов его шерами отправилось юзеру
  holderFeeDistributed: string; //сколько комсы с трейдов его шерами отправилось его акционерам
  totalVolume: string; //тотал вольюм трейдинга
  _id: string;
  othersShares: {
    //шеры которые холдит
    subject: string; //кого холдит
    amount: string; //сколько
    isEligible: boolean; //получает ли акционерную комсу
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
}

export interface IHistory extends Document {
  //история хуйни
  date: Date;
  type: HistoryTypes; //тип события
  price: string; //за сколько
  amount: string; //сколько шеров
  subject: IAccount[]; //кого покупали
  account: IAccount[]; //кто покупал
}
