import { IRecipeMeta } from "./recipe";

export interface IUpdateUser {
    _id: string;
    name?: string;
    username?: string;
    birthday?: number;
    picture?: string;
    bio?: string;
}

export interface ICreateUser {
    email: string;
    name: string;
    username: string;
    birthday?: number;
    picture?: string;
    bio?: string;
}

export interface IUserMeta {
    user: string;
    date: Date;
  }

export interface IUser {
    _id: string;
    email: string;
    name: string;
    username: string;
    birthday: Date | number;
    picture: string;
    bio: string;
    created_at: Date | number;
    privateProfile: boolean;
    PrivateLikes: boolean;
    meta: IMeta;
}

export interface IUserPreview {
  _id: string;
  picture: string;
  username: string;
}

export interface IMeta {
  rec_liked: IRecipeMeta[];
  rec_starred: IRecipeMeta[];
  followers: IUserMeta[];
  following: IUserMeta[];
}