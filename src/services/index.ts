import axios from "axios";
import {
  createRecipe,
  updateRecipe,
  findRecipeById,
  findRecipeByUser,
  feedRecipes,
  addLike,
  removeLike,
  addStar,
  removeStar,
  findRecipeByUserMeta,
  uploadRecipeImage,
} from "./recipes";
import {
  createUser,
  updateUser,
  findUserByEmail,
  findUserById,
  addFollower,
  removeFollower,
  totalLikes,
  uploadUserImage,
} from "./user";

export const baseURL = process.env.REACT_APP_API_HOSTNAME;

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

api.defaults.headers.common = {
  "X-API-Key": process.env.REACT_APP_API_KEY,
};

const services = {
  createRecipe,
  updateRecipe,
  findRecipeById,
  findRecipeByUser,
  feedRecipes,
  addLike,
  removeLike,
  addStar,
  removeStar,
  createUser,
  updateUser,
  findUserByEmail,
  findUserById,
  addFollower,
  removeFollower,
  totalLikes,
  findRecipeByUserMeta,
  uploadRecipeImage,
  uploadUserImage,
};

export default services;
