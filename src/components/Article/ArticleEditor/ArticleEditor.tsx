import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import FormFieldset from "../../FormFieldset";

import { getArticleBySlug, setArticle } from "../../../service/articleService";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { AxiosError } from "axios";
import { TArticle } from "../../../types/Article";
import MDEditor, { ContextStore } from "@uiw/react-md-editor";

type TForm = {
    title: string,
    description: string,
    body: string,
    tagList: string[]
}
const emptyForm = {
    title: "",
    description: "",
    body: "",
    tagList: [""]
}
function ArticleEditor() {
    const { state } = useLocation();
    const [{title, description, body, tagList }, setForm ] = useState<TForm>(state || emptyForm); 
    const [errorMessage, setErrorMessage ] = useState("");
    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        const redirect = () => {navigate("/dmblog", {replace: true, state: null})}
        if (!isAuth) {
            alert("You need to login first!")
            return redirect()
        };
        if (state || !slug) return;

        getArticleBySlug({slug})
        .then((article: TArticle) => {
            
            const { id, title, description, body, tagList } = article;
            if (loggedUser.id !== id) redirect();
            setForm({ title, description, body, tagList });
        })
        .catch((error) => {handleError(error as AxiosError)})
        
        return () => setForm(emptyForm);

    }, [headers, isAuth, loggedUser.id, navigate, slug, state]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm((prev: TForm) =>  ({...prev, [name]:value})); 
    }
    const handleMarkdownChange = (value?: string | undefined, event?: ChangeEvent<HTMLTextAreaElement> | undefined, state?: ContextStore | undefined) => {
        event?.preventDefault()
        const name = state?.textarea ? state.textarea.name : "";
        if (!value) { value = ""};
        setForm((prev: TForm) => ({...prev, [name]:value}));
    }
    const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setForm((prev: TForm) =>  ({...prev, tagList: value.split(/, | /)})); 
    }
    const handleSubmit = (e: MouseEvent<HTMLFormElement> ) => {
        e.preventDefault();
        setArticle({ userId: loggedUser.id, title, description, body, artSlug: slug || null, tagList, headers })
        .then((article: TArticle) => {navigate(`dmblog/article/${article.slug}`)})
        .catch((error: AxiosError) => { handleError(error) })
    }
    const handleError = (e: AxiosError) => {
        var message = e.name + " caused by " + e.cause + ", message: " + e.message;
        setErrorMessage(message);
    }
    return (
        <>
            
                {errorMessage && 
                    <div className="col">
                        <h1>Error!</h1>
                        <p className="error-message">{errorMessage}</p>
                    </div>}
            <div className="col">
                <form className="article-form" onSubmit={handleSubmit}> 
                    <fieldset>
                            {errorMessage && <h1>{errorMessage}</h1>}
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
                            
                            <MDEditor  
                                className="markdown-editor"
                                textareaProps={{rows: 8, name: "body"}}
                                value={body}
                                onChange={handleMarkdownChange}
                            />
                            {/* <ImageUploader onFilesSelected={setFile}/> */}
                            <FormFieldset
                            type="text"
                            name="tags"
                            placeholder="Put some tags into it!"
                            value={tagList.toLocaleString()}
                            changeHandler={handleTagInput}
                            required={false}
                            title="Article tags"/>
                            <button className="btn btn-form" type="submit">
                                {slug? "Update Article" : "Post Article"}
                            </button>
                    </fieldset>
                </form> 
            </div>
        </>
                
        
    )
}


export default ArticleEditor;