import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

export type TTagsContext = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>
};


const TagsContext = createContext<TTagsContext | null>(null);

export function useTags() {
  return useContext(TagsContext);
}

function TagsProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [tags, setTags] = useState<string[]>([]);
  
  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
}
export default TagsProvider;
