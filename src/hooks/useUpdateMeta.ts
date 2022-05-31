import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import services from "../services";
import { discovAddRecipes, followAddRecipes } from "../store/feedSlice";
import { updateStoredUser } from "../store/userSlice";

const useUpdateMeta = (
  userEmail: string | undefined,
  toggle?: boolean
): void => {
  const dispatch = useAppDispatch();
  const { findUserByEmail, feedRecipes } = services;
  const userId = useAppSelector((state) => state.user.user._id);

  useEffect(() => {
    userEmail &&
      findUserByEmail(userEmail).then((response) => {
        if (typeof response === "string") return;
        dispatch(updateStoredUser(response));
      });
  }, [dispatch, findUserByEmail, userEmail, toggle]);

  useEffect(() => {
    feedRecipes().then((response) => {
      if (typeof response === "string") return;
      dispatch(discovAddRecipes(response));
    });

    feedRecipes(10, userId).then((response) => {
      if (typeof response === "string") return;
      dispatch(followAddRecipes(response));
    });
  }, [dispatch, feedRecipes, toggle, userId]);
};

export default useUpdateMeta;
