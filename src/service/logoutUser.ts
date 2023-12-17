import { TAuthContext, useAuth } from "../context/AuthContext";

export function logoutUser() {
    const { setAuthState } = useAuth() as TAuthContext;
    return { headers: null, isAuth: false, loggedUser: null };
}