import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../service/userUtils";

export type TAuthState = {
    headers: object | null,
    isAuth: boolean,
    loggedUser: {
        bio: string | null,
        email: string,
        image: string | null,
        username: string
    };
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
    loggedUser: {
        bio: null,
        email: "",
        image: null,
        username: "",
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