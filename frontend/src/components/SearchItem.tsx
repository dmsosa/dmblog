import { FormEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchItem() {

    const [ searchString, setSearchString ] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: SyntheticEvent<HTMLInputElement> ) => {
        const input = e.target as HTMLInputElement;
        setSearchString(input.value);
      }
    
      const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        navigate(`/articles/${searchString}`);
      }
    return (
    <form onSubmit={handleSubmit}>
        <input className="search-input" type="text" placeholder="search articles..." value={searchString} onChange={handleChange}></input>
        <button type="submit" className="btn btn-primary">search</button>
    </form>
    );
}

export default SearchItem;
