import axios, { AxiosError } from "axios"
import { TAuthState } from "../context/AuthContext";
import { ApiError, errorHandler } from "./handleError";

let instance = axios.create({
    baseURL:"/api",
    timeout: 1000,
    headers: {"duvi":"duvivalue"}
})





type TUserData = {
    username: string,
    email: string,
    password: string
}

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
            url:"auth/register"
        })
        const { token, loggedUser } = data;
        const headers = {Authorization: `Bearer ${token}`};
        const loggedIn = { headers, isAuth: true, loggedUser: loggedUser };

        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

        return loggedIn;

    } catch (error: any) {
        errorHandler(error);
        throw(error);
    }
    
}

export async function getUser({ headers } : { headers: object }) {

    try {
        const { data } = await axios.request({
            method: "GET",
            url: "auth/login", 
            headers
        });
        return data.loggedUser;
    } catch (error) {

    }
}

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

export async function loginUser({ login, password } : { login: string, password: string }): Promise<TAuthState>  {

    try {
        const { data } = await instance.request({
            data: {login: login, password: password},
            method: "POST",
            url: "auth/login"
        });
        
        const headers = { "Authorization" : "Bearer "+data.token};
        const loggedIn = { headers: headers, isAuth: true, loggedUser: data.loggedUser }

        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
        return data.loggedUser;
    } catch (error: any) {
        errorHandler(error);
        throw(error);
    }

}


