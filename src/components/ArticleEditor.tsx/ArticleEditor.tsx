import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import FormFieldset from "../FormFieldset";
import ContainerRow from "../ContainerRow";
import { getArticleBySlug, setArticle } from "../../service/articleService";
import { redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { AxiosError } from "axios";
import { TArticle } from "../../types/Article";

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
    const [{title, description, body, tagList }, setForm ] = useState(state || emptyForm); 
    const [errorMessage, setErrorMessage ] = useState("");
    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        const redirect = () => {navigate("/", {replace: true, state: null})}
        if (!isAuth) return redirect();
        if (state || !slug) return;

        getArticleBySlug({slug, headers})
        .then((article: TArticle) => {
            
            const { id, title, description, body, tags } = article;
            if (loggedUser.id !== id) redirect();
            setForm({ title, description, body, tags });
        })
        .catch((error) => {handleError(error as AxiosError)})
        
        return () => setForm(emptyForm);

    }, [headers, isAuth, loggedUser.id, navigate, slug, state]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
        const name = e.target.name;
        const value = e.target.innerText;
        setForm((prev: TForm) =>  ({...prev, [name]:value})); 
    }
    const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.innerText;
        setForm((prev: TForm) =>  ({...prev, tagList: value.split(/, | /)})); 
    }
    const handleSubmit = (e: MouseEvent<HTMLFormElement> ) => {
        e.preventDefault();
        setArticle({title, description, body, artSlug: slug || null, tagList, headers })
        .then((article: TArticle) => {navigate(`/article/${article.slug}`)})
        .catch((error: AxiosError) => { handleError(error) })
    }
    const handleError = (e: AxiosError) => {
        var message = e.name + " caused by " + e.cause + ", message: " + e.message;
        setErrorMessage(message);
    }
    return (
                
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
                            <button className="btn btn-form" type="submit">
                                {slug? "Update Article" : "Post Article"}
                            </button>
                    </fieldset>
                </form> 

        
    )
}


export default ArticleEditor;