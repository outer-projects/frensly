import { IAccount, IProfile } from "./users";

export interface IPond extends Document {
    pondId: number;
    profile: IProfile;
    status: string;
    creator: IAccount;
    name: string;
    description: string;
    telegram: string;
    twitter: string;
    url: string;
    discord: string;
    image: string;
    isInitialized: boolean;
    isPresale: boolean;
    isRestricted: boolean;
    presaleStart: Date;
    presaleEnd: Date;
    presalePrice: string;
    presaleGoal: string;
    creationDate: Date;
    supply: string;
    price: string;
    totalVolume: string;
    holderFeeDistributed: string;
    chat: any;
    whitelist: IAccount[];
    whitelistApplications: {
        user: IAccount;
        date: Date;
    }[];
    holders: {
        user: IAccount;
        amount: string;
    }[];
}