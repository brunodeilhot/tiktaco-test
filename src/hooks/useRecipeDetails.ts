import { useAppSelector } from "./index";
import { useEffect, useState } from "react";
import { IRecipe } from "../models/recipe";
import services from "../services";

const useRecipeDetails = (recipeId: string) => {
  const user = useAppSelector((state) => state.user);
  const { findRecipeById } = services;
  const [recipeDetails, setRecipeDetails] = useState<IRecipe | null>(null);

  useEffect(() => {
    findRecipeById(recipeId, user.user._id).then((response) => {
      if (typeof response === "string") return;
      setRecipeDetails(response);
    });
  }, [findRecipeById, recipeId, user.user._id]);

  return recipeDetails;
};

export default useRecipeDetails;
