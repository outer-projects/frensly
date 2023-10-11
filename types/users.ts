import { IPost } from "./feed";

export interface IAccount {
  address: string;
  isInitialized: boolean;
  initDate: Date;
  profile: IProfile[]; //профиль с неймами и прочей хуитой
  history: IHistory[][]; //все действия юзера
  sharesAmount: string; //сколько шеров этого юзера существует
  subjectFee: number; //% комсы в юзера
  holderFee: number; //акционерная комса
  holderFeeClaimed: string; //сколько юзер заклеймил акционерной комсы
  subjectFeeClaimed: string; //сколько комсы с трейдов его шерами отправилось юзеру
  holderFeeDistributed: string; //сколько комсы с трейдов его шерами отправилось его акционерам
  totalVolume: string; //тотал вольюм трейдинга
  othersShares: { //шеры которые холдит 
      subject: IAccount[]; //кого холдит
      amount: string; //сколько
      isEligible: boolean; //получает ли акционерную комсу
  }[];
}
export interface IProfile { //тут все очевидно вроде
  account: IAccount;
  twitterId: string;
  avatar: string;
  twitterName: string;
  posts:string[]
  twitterHandle: string;
  twitterDescription: string;
  regDate: Date;
  isFollowing:  IProfile[][];
  isFollowedBy: IProfile[][];
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

export interface IHistory extends Document { //история хуйни
  date: Date;
  type: HistoryTypes; //тип события
  price: string; //за сколько
  amount: string; //сколько шеров
  subject: IAccount[]; //кого покупали
  account: IAccount[]; //кто покупал
}