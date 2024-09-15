import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TUser } from "../types/User";
import { getUser } from "../service/userService";
import { ApiError } from "../service/errorHandler";

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

let initState: TAuthState = {
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
  initState = JSON.parse(loggedIn);
}

function AuthProvider({ children }: { children: ReactNode[] | ReactNode }) {
  const [authState, setAuthState] = useState(initState);

  useEffect(() => {
    if (!authState.headers || authState.isAuth) return;

    getUser({ headers: authState.headers })
    .then((loggedUser) => setAuthState({headers: authState.headers, isAuth: true, loggedUser}))
    .catch((error: ApiError) => console.log(error.getDefaultMessage()))

  }, [authState, setAuthState])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
