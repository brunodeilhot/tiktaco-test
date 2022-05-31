import { IUserMeta, IUserPreview } from "./user";

export interface IRecipePreview {
    _id: string;
    title: string;
    picture: string;
    meta: { totalLikes: number };
    user: IUserPreview
}

export interface IRecipe {
    _id: string;
    title: string;
    picture: string;
    description: string;
    diet: string[];
    servings: number;
    time: number;
    steps: string[];
    ingredients: Ingredient[];
    created_at: number;
    edited_at: number;
    user: IUser;
    meta: IMeta
}

export interface Ingredient {
    name: string;
    quantity: string;
}

interface IUser {
    _id: string;
    username: string;
}

interface IMeta {
    likes: IUserMeta[];
    totalLikes: number;
    views: IUserMeta[];
    totalViews: number;
}

export interface IDiet {
    glutenFree: boolean;
    dairyFree: boolean;
    vegan: boolean;
    vegetarian: boolean;
    keto: boolean;
}

export interface ICreateRecipe {
  title: string;
  picture: string;
  servings: number;
  time: number;
  ingredients: Ingredient[];
  steps: string[];
  user: string;
  description?: string;
  diet?: string[];
}

export interface IUpdateRecipe {
    _id: string;
    title?: string;
    picture?: string;
    servings?: number;
    time?: number;
    ingredients?: Ingredient[];
    steps?: string[];
    description?: string;
    diet?: string[];
}

export interface IRecipeMeta {
    recipe: string;
    date: Date;
}