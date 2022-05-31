import { useEffect, useState } from "react";
import { IUser } from "../models/user";
import services from "../services";

const useUserInfo = (id: string | undefined) => {
  const { findUserById } = services;
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    id &&
      findUserById(id).then((response) => {
        if (typeof response === "string") return;
        setUser(response);
      });
  }, [findUserById, id]);

  return user;
};

export default useUserInfo;
