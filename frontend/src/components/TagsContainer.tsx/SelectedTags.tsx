import { MouseEvent } from "react";

function SelectedTags({ tags, setTags }:{ tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }) {
  
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const tagName = e.currentTarget.dataset.tag;
        setTags((prev) => prev.filter(tag => tag !== tagName))
    }

  return (
  
  <div className="selected-tags-wrapper">
    
      {tags.length > 0 ? 
        tags.slice(0, 50).map((name) => (
        <div className="selected-tags" key={name}>
            <span className="selected-tags-span">
                {name}
            </span>
            <button className="selected-tags-btn" data-tag={name} onClick={handleClick}>
                X
            </button>
        </div>
        )) :
        <div className="loading-tags-container">
          <h1>list: please select some tags</h1>
        </div>
      }
    <div className="selected-tags restore">
        <span className="selected-tags-span">
            restore
        </span>
        <button className="selected-tags-btn" onClick={() => {
            setTags([]);
        }}>
            X
        </button>
    </div>
  </div>
  )
  
  
}

export default SelectedTags;
