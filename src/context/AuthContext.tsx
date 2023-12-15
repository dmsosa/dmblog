import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { getUser } from "../service/getUser";

type TAuthState = {
    headers: object | null,
    isAuth: boolean,
    loggedUser: User | null
}

export  type TAuthContext = {
    authState: TAuthState,
    setAuthState: React.Dispatch<React.SetStateAction<TAuthState>> | null
};

const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth() {
    return useContext(AuthContext);
};

var authState: TAuthState = {
    headers: null,
    isAuth: false,
    loggedUser: null
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
            .then((loggedUser) => 
                setAuthState((prev) => ({ ...prev, loggedUser }))
            ); 
        }, [setAuthState])
    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;