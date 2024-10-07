import { MouseEvent } from "react";

function TagList({ tags, setTags }:{ tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }) {

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const tag = btn.innerText.trim();
    setTags((prev) => ([...prev, tag ]));
  };
  return (
  
  <div className="row">
    <div className="col">
      {tags && tags.length > 0 ? 
        tags.slice(0, 50).map((name) => (
          <button key={name} className="tag-btn" onClick={handleClick}>
            {name}
          </button>
        )) :
        <div className="loading-tags">
          <h1>No tags available</h1>
        </div>
      }
    </div>
  </div>
  )
  
  
}

export default TagList;
