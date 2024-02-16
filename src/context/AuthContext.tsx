import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../service/userService";
import { errorHandler } from "../service/handleError";
import { AxiosError } from "axios";
import { TUser } from "../types/User";

export type TAuthState = {
    headers: object | null,
    isAuth: boolean,
    loggedUser: TUser;
}

export  type TAuthContext = {
    authState: TAuthState,
    setAuthState: React.Dispatch<React.SetStateAction<TAuthState>>
};

const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth() {
    return useContext(AuthContext);
};

var authState: TAuthState = {
    headers: null,
    isAuth: false,
    loggedUser: {
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
};

const loggedIn : string | null = localStorage.getItem("loggedUser");

if (loggedIn) {
    authState = JSON.parse(loggedIn);
};

function AuthProvider({ children }: { children : ReactNode[] | ReactNode }) {
    const [{ headers, isAuth, loggedUser } , setAuthState] = useState(authState);
    useEffect(
        () => {
            if (headers === null ) { return };
            getUser({ headers })
            .then((loggedUser) => {
                setAuthState((prev) => ({ ...prev, loggedUser }))
            })
            .catch((e: AxiosError) => errorHandler(e)); 
        }, [setAuthState])
    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;