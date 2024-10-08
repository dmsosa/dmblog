import axios, { AxiosError } from "axios";
import { TAuthState } from "../context/AuthContext";
import { createApiError } from "./errorHandler";
import { TUser } from "../types/User";

//Axios instance
const instance = axios.create({
  baseURL: "/api/users",
  timeout: 1000,
  headers: { duvi: "duvivalue" },
});

type TAuthResponse = {
  token: string;
  loggedUser: TUser;
};

//OAuth2 Providers
export type TProvider = "google" | "github" | "facebook";

//Register User
export async function signUpUser({
  username,
  email,
  password,
  asAdmin = false,
}: {
  username: string;
  email: string;
  password: string;
  asAdmin?: boolean;
}): Promise<TAuthState> {
  const signUpData = {
    username: username,
    email: email,
    password: password,
    role: asAdmin ? "ADMIN" : "USER",
  };

  try {
    const { data } = await instance.request({
      data: signUpData,
      method: "POST",
      url: "/register",
    });
    const { token, loggedUser }: { token: string; loggedUser: TUser } = data;
    const headers = { Authorization: `Bearer ${token}` };

    const loggedIn = { headers: headers, isAuth: true, loggedUser: loggedUser };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error: unknown) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}
//Login User
export async function loginUser({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<TAuthState> {
  try {
    const { data } = await instance.request({
      data: { login: login, password: password },
      method: "POST",
      url: "/login",
    });

    const headers = { Authorization: "Bearer " + data.token };
    const loggedIn = {
      headers: headers,
      isAuth: true,
      loggedUser: data.loggedUser,
    };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
    return loggedIn;
  } catch (error: unknown) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

//Logout User
export function logoutUser() {
  localStorage.removeItem("loggedUser");
  instance.post("/logout");
  return {
    headers: null,
    isAuth: false,
    loggedUser: {
      id: null,
      username: "",
      email: "",
      password: "",
      bio: "",
      imageUrl: "",
      backgroundImageUrl: "",
      icon: "apple",
      backgroundColor: "#DFFF00",
      followersCount: 0,
      followingCount: 0,
      followers: null,
      following: null,
      createdAt: null,
      updatedAt: null,
      isFollowing: false,
    },
  };
}

//Get current User
export async function getUser({
  headers,
}: {
  headers: object;
}): Promise<TUser> {
  try {
    const { data } : { data: TUser } = await instance.request({
      method: "GET",
      url: "/current",
      headers: headers,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

//Get  User By Username
export async function getUserByUsername({
  username,
}: {
  username: string;
}): Promise<TUser> {
  try {

    const { data } = await instance.request({
      method: "GET",
      url: `/${username}`,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

//Get  User By Id
export async function getUserById({
  userId,
}: {
  userId: number | null;
}): Promise<TUser> {
  try {

    const { data } = await instance.request({
      method: "GET",
      url: `/find/${userId}`,
    });

    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}



export async function updateUser({
  headers,
  username,
  email,
  bio,
  image,
  backgroundImage,
  icon,
  backgroundColor,
}: {
  headers: { [key: string]: string };
  username: string;
  email: string;
  bio: string;
  image: File | undefined;
  backgroundImage: File | undefined;
  icon: string;
  backgroundColor: string;
}): Promise<TAuthState> {
  try {

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("icon", icon);
    formData.append("backgroundColor", backgroundColor);

    if (image) {
      console.log("image found");
      formData.append("image", image);
    }
    if (backgroundImage) {
      formData.append("backgroundImage", backgroundImage);
    }

    const { data }: { data: TAuthResponse } = await instance.request({
      url: "",
      headers: headers,
      method: "PUT",
      data: formData,
    });

    const { token, loggedUser } = data;

    const loggedIn = {
      headers: { ...headers, Authorization: "Bearer " + token },
      isAuth: true,
      loggedUser,
    };
    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

//Toggle Follow
export async function toggleFollow({
  headers,
  username,
  isFollowing,
}: {
  headers: object;
  username: string;
  isFollowing: boolean;
}) {
  try {
    const { data } = await instance.request({
      url: `/follow/${username}`,
      method: isFollowing ? "DELETE" : "POST",
      headers: headers,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

export async function getFollowersOf({
  userId,
}: {
  userId: number;
}): Promise<TUser[]> {
  try {
    const { data } = await instance.request({
      method: "GET",
      url: `/followers/${userId}`,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

export async function getFollowingOf({
  userId,
}: {
  headers: object | null;
  userId: number | null;
}): Promise<TUser[]> {
  try {


    const { data } = await instance.request({
      method: "GET",
      url: `/following/${userId}`,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

export async function deleteUser({ headers, username } : { headers: object, username: string }): Promise<void> {
  return instance.request({
    method: "DELETE",
    url: `/${username}`,
    headers: headers
  })
}