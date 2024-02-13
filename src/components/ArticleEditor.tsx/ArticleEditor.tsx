import { ChangeEvent, MouseEvent, useState } from "react";
import FormFieldset from "../FormFieldset";

function ArticleEditor() {
    const [{title, description, body, tagList }, setForm ] = useState({
        title: "",
        description: "",
        body: "",
        tagList: [""]
    }); 

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
        const name = e.target.name;
        const value = e.target.innerText;
        setForm((prev) =>  ({...prev, [name]:value})); 
    }
    const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.innerText;
        setForm((prev) =>  ({...prev, tagList: value.split(/, | /)})); 
    }
    const handleSubmit = (e: MouseEvent<HTMLFormElement> ) {
        e.preventDefault();
    }

    return (
        <form className="article-form" onSubmit={handleSubmit}> 
            <FormFieldset
            type="text"
            name="title"
            placeholder="A wonderful title"
            value={title}
            changeHandler={handleChange}
            required={true}
            minLength={5}
            title="Article title"/>
            <FormFieldset
            type="text"
            name="description"
            placeholder="A description of what your article is about"
            value={description}
            changeHandler={handleChange}
            required={true}
            minLength={10}
            title="Article description"/>
            
            <fieldset className="form-group">
                <label htmlFor="body">Article body</label>
                <textarea
                value={body}
                onChange={handleChange}
                name="body"
                className="form-control"
                required
                placeholder="Write the content of your body, it can be written in Markdown Language !"
                rows={8}>
                </textarea>
            </fieldset>
            <FormFieldset
            type="text"
            name="tags"
            placeholder="Put some tags into it!"
            value={tagList.toLocaleString()}
            changeHandler={handleTagInput}
            required={false}
            title="Article tags"/>
        </form>
        <button ></button>
    )
}


export default ArticleEditor;