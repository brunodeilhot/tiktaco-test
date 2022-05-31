import { IRecipe } from "./../models/recipe";
import { useEffect, useState } from "react";
import services from "../services";

const useRecipeList = (userId: string, limit: number, listType: string) => {
  const { findRecipeByUser, findRecipeByUserMeta } = services;
  const [recipeList, setRecipeList] = useState<IRecipe[]>();

  useEffect(() => {
    listType === "recipes"
      ? findRecipeByUser(userId, limit).then((response) => {
          if (typeof response === "string") return;
          setRecipeList(response);
        })
      : findRecipeByUserMeta(userId, listType, limit).then((response) => {
          if (typeof response === "string") return;
          setRecipeList(response);
        });
  }, [findRecipeByUser, findRecipeByUserMeta, limit, listType, userId]);

  return recipeList;
};

export default useRecipeList;
