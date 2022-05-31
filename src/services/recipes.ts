import {
  ICreateRecipe,
  IRecipe,
  IRecipePreview,
  IUpdateRecipe,
} from "../models/recipe";
import { api, baseURL } from "./index";

export const createRecipe = async ({
  title,
  picture,
  servings,
  time,
  ingredients,
  steps,
  user,
  description,
  diet,
}: ICreateRecipe): Promise<IRecipe> => {
  return api
    .post(`${baseURL}/recipes/create`, {
      title: title,
      picture: picture,
      servings: servings,
      time: time,
      ingredients: ingredients,
      steps: steps,
      user: user,
      description: description,
      diet: diet,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const updateRecipe = async ({
  _id,
  title,
  picture,
  servings,
  time,
  ingredients,
  steps,
  description,
  diet,
}: IUpdateRecipe): Promise<IRecipe> => {
  return api
    .put(`${baseURL}/recipes/update/${_id}`, {
      id: _id,
      title: title,
      picture: picture,
      servings: servings,
      time: time,
      ingredients: ingredients,
      steps: steps,
      description: description,
      diet: diet,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const findRecipeById = async (
  id: string,
  userId: string | undefined
): Promise<IRecipe> => {
  return api
    .get(
      userId
        ? `${baseURL}/recipes/find/id/${id}/${userId}`
        : `${baseURL}/recipes/find/id/${id}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const findRecipeByUser = async (
  userId: string,
  limit: number = 10
): Promise<IRecipe[]> => {
  return api
    .get(`${baseURL}/recipes/find/user/${userId}/${limit}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const findRecipeByUserMeta = async (
  userId: string,
  meta: string,
  limit: number = 10
): Promise<IRecipe[]> => {
  return api
    .get(`${baseURL}/recipes/find/user/${userId}/meta/${meta}/${limit}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const feedRecipes = async (
  limit: number = 10,
  user: string = ""
): Promise<IRecipePreview[] | string> => {
  return api
    .get(`/recipes/feed/${limit}/${user}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const addLike = async (
  id: string,
  userId: string
): Promise<number | string> => {
  return api
    .post(`${baseURL}/recipes/meta/likes/${id}/add/${userId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.message;
    });
};

export const removeLike = async (
  id: string,
  userId: string
): Promise<number | string> => {
  return api
    .delete(`${baseURL}/recipes/meta/likes/${id}/remove/${userId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.message;
    });
};

export const addStar = async (
  userId: string,
  recipeId: string
): Promise<number | string> => {
  return api
    .post(`${baseURL}/user/meta/stars/${userId}/add/${recipeId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.message;
    });
};

export const removeStar = async (
  userId: string,
  recipeId: string
): Promise<number | string> => {
  return api
    .delete(`${baseURL}/user/meta/stars/${userId}/remove/${recipeId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.message;
    });
};

export const uploadRecipeImage = async (file: any): Promise<number> => {
  return api
    .post(`${baseURL}/uploads/recipes`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.message;
    });
};
