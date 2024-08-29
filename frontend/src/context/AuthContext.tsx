import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser, logoutUser } from "../service/userService";
import { errorHandler } from "../service/handleError";
import { AxiosError } from "axios";
import { TUser } from "../types/User";

export type TAuthState = {
  headers: { [key: string]: string } | null;
  isAuth: boolean;
  loggedUser: TUser;
};

export type TAuthContext = {
  authState: TAuthState;
  setAuthState: React.Dispatch<React.SetStateAction<TAuthState>>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

let authState: TAuthState = {
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
    followersCount: null,
    followingCount: null,
    followers: null,
    following: null,
    createdAt: null,
    updatedAt: null,
    isFollowing: false,
  },
};

const loggedIn: string | null = localStorage.getItem("loggedUser");

if (loggedIn) {
  authState = JSON.parse(loggedIn);
}

function AuthProvider({ children }: { children: ReactNode[] | ReactNode }) {
  const [{ headers, isAuth, loggedUser }, setAuthState] = useState(authState);

  useEffect(() => {
    if (!headers || !isAuth) {
      return;
    }

    getUser({ headers })
      .then((loggedUser) => {
        setAuthState((prev) => ({ ...prev, loggedUser }));
      })
      .catch((e: AxiosError) => {
        errorHandler(e);
        console.log(
          "Could not retrieve loggedUser from backend: " +
            loggedUser +
            "\nlogging out...",
        );
        setAuthState(logoutUser());
      });
  }, [headers, isAuth, loggedUser, setAuthState]);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
