import { ICreateUser, IUpdateUser, IUser } from "./../models/user";
import { api, baseURL } from "./index";

export const createUser = async ({
  name,
  email,
  username,
  birthday,
  picture,
  bio,
}: ICreateUser): Promise<IUser> => {
  return api
    .post(`${baseURL}/user/create`, {
      name: name,
      email: email,
      username: username,
      birthday: birthday,
      picture: picture,
      bio: bio,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const updateUser = async ({
  _id,
  username,
  name,
  birthday,
  picture,
  bio,
}: IUpdateUser): Promise<IUser> => {
  return api
    .put(`${baseURL}/user/update/${_id}`, {
      username: username,
      name: name,
      birthday: birthday,
      picture: picture,
      bio: bio,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const findUserByEmail = async (email: string): Promise<IUser> => {
  return api
    .get(`${baseURL}/user/find/email/${email}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const findUserById = async (id: string): Promise<IUser> => {
  return api
    .get(`${baseURL}/user/find/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const addFollower = async (
  id: string,
  userId: string
): Promise<number | string> => {
  return api
    .post(`${baseURL}/user/followers/${id}/add/${userId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.message;
    });
};

export const removeFollower = async (
  id: string,
  userId: string
): Promise<number | string> => {
  return api
    .delete(`${baseURL}/user/followers/${id}/remove/${userId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error.message;
    });
};

export const totalLikes = async (id: string): Promise<number | string> => {
  return api
    .get(`${baseURL}/user/meta/likes/total/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const uploadUserImage = async (file: any): Promise<number> => {
  return api
    .post(`${baseURL}/uploads/users`, file, {
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