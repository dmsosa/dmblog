import axios, {  AxiosError, AxiosResponse } from "axios";
import { TAuthState } from "../context/AuthContext";
import {  CustomError, errorHandler } from "./handleError";
import { TUser } from "../types/User";


//Axios instance
let instance = axios.create({
    baseURL:"/api/users",
    timeout: 1000,
    headers: {"duvi":"duvivalue"}
})

//Custom type
type TUserData = {
    username: string,
    email: string,
    bio: string | null,
    image: string | null,
    password: string
}

type TAuthResponse = {
    token: string,
    loggedUser: TUser
}

//OAuth2 Providers
export type TProvider = "google" | "github" | "facebook";

////////////////// Sign Up with OAuth provider

//Authorize with the given provider
export function authorizeWith(provider: TProvider) : void {

    var providerURL = "";

    switch (provider) {
        case "google" : {
            providerURL = "http://localhost:8082/oauth2/authorization/google"
            break
        }
        case "github" : {
            providerURL = "http://localhost:8082/oauth2/authorization/github";
            break
        }
        case "facebook" : {
            providerURL = "http://localhost:8082/oauth2/authorization/facebook";
            break
        }
    }
    window.location.replace(providerURL);
}


// //logout user 
// function logoutFrom({ provider, accessToken } :
//     {
//         provider: TProvider,
//         accessToken: string
//     }) : void {
//         switch (provider) {
//             case "google": {
//                 break
//             }
//             case "github" : {
//                 break
//             }
//             case "facebook" : {
//                 break
//             }
//         }
// }
//Sign Up User
export async function signUpUser( { userData, asAdmin } : {
    userData?: TUserData,
    asAdmin?: boolean, 
}): Promise<TAuthState> {


    if (!userData) {
        throw new CustomError("Please, provide your registration data!");
    };
    const { username, email, bio, image, password } = userData; 
    const signUpData = {
        username: username, 
        email: email, 
        bio: bio ? bio : "I just registered in Dmsosa Blog!",
        image: image ? image : null,
        password: password, 
        role: asAdmin ? "ADMIN" : "USER" 
    };
    
    try {
        const { data } = await instance.request({
            data: signUpData,
            method: "POST",
            url:"/register"
        })
        const { token, loggedUser } : { token: string, loggedUser: TUser }= data;
        const headers = {Authorization: `Bearer ${token}`};


        const loggedIn = { headers: headers, isAuth: true, loggedUser: loggedUser };
        
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

        return loggedIn;

    } catch (error: any) {
        errorHandler(error);
        throw(error);
    }
}
//Login User
export async function loginUser({ login, password } : { login: string, password: string }): Promise<TAuthState>  {


    try {
        if ( login.length < 1 || password.length < 1 ) {
            throw new CustomError("You must indicate your login credentials!");
        }
        const { data } = await instance.request({
            data: {login: login, password: password},
            method: "POST",
            url: "/login"
        });
        
        const headers = { Authorization : "Bearer "+data.token};
        const loggedIn = { headers: headers, isAuth: true, loggedUser: data.loggedUser }

        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
        return loggedIn;
    } catch (error: any) {
        errorHandler(error);
        throw(error);
    }

}
//Logout User
export function logoutUser() {
    localStorage.removeItem("loggedUser");
    return {
        headers: null,
        isAuth: false,
        loggedUser: {
            id: null,
            username: "",
            email: "",
            password: "",
            image: "",
            bio: "",
            followersCount: null, 
            followingCount: null,
            followers: [],
            following: [],
            createdAt: null,
            updatedAt: null,
            isFollowing: false
        }
    }
}


//Get current User
export async function getUser({ headers } : { headers: object  }) : Promise<TUser> {

    try {
        const { data } = await instance.request({
            method: "GET",
            url: "/current", 
            headers: headers
        });
        return data.loggedUser;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

//Get  User By Username
export async function getUserByUsername({ headers, username } : {  
    headers?: object | null,
    username: string }) : Promise<TUser> {

    try {
        if (!headers) { headers = {}}
        const { data } = await instance.request({
            method: "GET",
            url: `/${username}`,
            headers: headers
        });
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

//Get  User By Id
export async function getUserById({  headers, userId } : { 
    headers?: object | null,
    userId: number | null }) : Promise<TUser> {
    
    try {
        if (!headers) { headers = {}};
        const { data } = await instance.request({
            method: "GET",
            url: `/find/${userId}`,
            headers: headers
        });



        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function updateUser({ headers, username, email, bio, image, password } : {
    headers: object,
    username: string,
    email: string,
    bio: string | null,
    image: string,
    password: string
    }
) : Promise<TAuthState> {
    try {
        if (!headers) { 
            headers = {} 
        }

        const { data } : { data: TAuthResponse } =  await instance.request({
            url:"/",
            headers: headers,
            method: "PUT",
            data: { username, email, bio, image, password }
        })
        const { token } = data;
        const newHeaders = { Authorization: `Bearer ${token}`};


        const loggedIn = { headers: newHeaders, isAuth: true, loggedUser: data.loggedUser};
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

        return loggedIn;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

//Toggle Follow
export async function toggleFollow({ headers, username, isFollowing} : {
    headers: object,
    username: string,
    isFollowing: boolean
}) {

    try {    
        const { data } = await instance.request(
            {
                url: `/follow/${username}`,
                method: isFollowing ? "DELETE":"POST",
                headers: headers
            }
        )
        return data;    
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function getFollowersOf({ headers, userId } : {
    headers: object | null,
    userId: number | null
}) : Promise<TUser[]> {
    try {
        if (!headers) { headers = {} };
        const { data } = await instance.request(
            {
                method: "GET",
                url: `/followers/${userId}`,
                headers: headers
            }
        )
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function getFollowingOf({ headers, userId } : {
    headers: object | null,
    userId: number | null
}) : Promise<TUser[]> {
    try {
        if (!headers) { headers = {} };

        const { data } = await instance.request(
            {
                method: "GET",
                url: `/following/${userId}`,
                headers: headers
            }
        )
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function uploadProfileImage({ profileImageFile, username, headers} : { profileImageFile: File, username: string, headers: object | null }) : Promise<void> {
    const formData = new FormData();
    formData.append("file", profileImageFile);
    return instance.post(`/images/${username}`, formData, { headers: {...headers, "Content-Type" :  "multipart/form-data"}, timeout: 10000});
}
export async function getProfileImage({ image } : { image: string }) : Promise<AxiosResponse> {
    return instance.get(`/images/${image}`, { timeout: 4000});
}

