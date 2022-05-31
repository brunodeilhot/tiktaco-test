import { useAppDispatch } from "./index";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import services from "../services";
import { updateStoredUser } from "../store/userSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { findUserByEmail } = services;
  const { isAuthenticated, user } = useAuth0();
  const [halfAuth, setHalfAuth] = useState<boolean>(false);

  const userEmail = user && user.email;

  useEffect(() => {
    userEmail &&
      findUserByEmail(userEmail).then((response) => {
        if (typeof response === "string") {
          setHalfAuth(true);
          return;
        }
        dispatch(updateStoredUser(response));
        setHalfAuth(false);
      });
  }, [dispatch, findUserByEmail, userEmail]);

  return { isAuthenticated, halfAuth, user };
};

export default useAuth;
