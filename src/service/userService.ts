import axios, {  AxiosError } from "axios";
import { TAuthState } from "../context/AuthContext";
import {  errorHandler } from "./handleError";
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
    password: string
}


const faultResponse = {
    id: null,
    username: "",
    email: "",
    password: "",
    image: null,
    bio: null,
    followersCount: null, 
    followingCount: null,
    followers: [],
    following: [],
    createdAt: null,
    updatedAt: null
}


//Sign Up User
export async function signUpUser( userData: TUserData, asAdmin:boolean=false): Promise<TAuthState> {

    const { username, email, password } = userData; 
    const signUpData = {
        username: username, 
        email: email, 
        password: password, 
        role: asAdmin? "ADMIN" : "USER" 
    };
    
    try {
        const { data } = await instance.request({
            data: signUpData,
            method: "POST",
            url:"/register"
        })
        const { token, loggedUser } : { token: string, loggedUser: TUser }= data;
        const headers = {Authorization: `Bearer ${token}`};
        const { id } = loggedUser;

        getFollowersOf({ headers, userId: id })
        .then( (followersList) => loggedUser.followers = followersList)
        .catch((error) => console.log(error))

        getFollowingOf({ headers, userId: id })
        .then( (followingList) => loggedUser.following = followingList)
        .catch((error) => console.log(error))


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
        const { data } = await instance.request({
            data: {login: login, password: password},
            method: "POST",
            url: "/login"
        });
        
        const headers = { "Authorization" : "Bearer "+data.token};
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
            bio: null,
            email: "",
            image: null,
            token: "",
            username: "",
        }
    }
}


//Get current User
export async function getUser({ headers } : { headers: object }) : Promise<TUser> {

    try {
        const { data } = await axios.request({
            method: "GET",
            url: "/login", 
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
    headers: object, 
    username: string }) : Promise<TUser> {

    try {
        const { data } = await axios.request({
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
export async function getUserById({ headers, userId } : { 
    headers: object, 
    userId: number | null }) : Promise<TUser> {
    
    if (!userId) return faultResponse;
    try {
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

//Toggle Follow
export async function toggleFollow({ headers, username, isFollowing} : {
    headers: object | null,
    username: string,
    isFollowing: boolean
}) {
    if (!headers) {
        headers = {};
    }
    try {    
        const { data } = await instance.request(
            {
                url: `/follow${username}`,
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

async function getFollowersOf({ headers, userId } : {
    headers: object,
    userId: number | null
}) : Promise<TUser[]> {
    try {
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

async function getFollowingOf({ headers, userId } : {
    headers: object,
    userId: number | null
}) : Promise<TUser[]> {
    try {
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



