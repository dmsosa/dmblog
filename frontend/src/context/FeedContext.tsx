import {
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TAuthContext, useAuth } from "./AuthContext";

export type TFeedState = {
  tabName: string;
  tagName: string;
};
export type TFeedContext = {
  tabName: string;
  tagName: string;
  changeFeed: (
    e: MouseEvent<HTMLButtonElement>,
    tabName: string,
  ) => Promise<void>;
};

const FeedContext = createContext<TFeedContext | null>(null);

export function useFeed() {
  return useContext(FeedContext);
}

function FeedProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const { authState } = useAuth() as TAuthContext;
  const { isAuth } = authState;
  const [{ tabName, tagName }, setFeedState] = useState<TFeedState>({
    tabName: isAuth ? "feed" : "global",
    tagName: "",
  });

  useEffect(() => {
    setFeedState((prev) => ({ ...prev, tabName: isAuth ? "feed" : "global" }));
  }, [isAuth]);

  const changeFeed = async (
    e: MouseEvent<HTMLButtonElement>,
    tabName: string,
  ) => {
    const buttonElement = e.target as HTMLElement;
    const tagName = buttonElement.innerText.trim();
    setFeedState({ tabName, tagName });
  };

  return (
    <FeedContext.Provider value={{ tabName, tagName, changeFeed }}>
      {children}
    </FeedContext.Provider>
  );
}
export default FeedProvider;
