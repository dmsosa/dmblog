import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ContainerRow from "../../components/ContainerRow";
import BannerContainer from "../../components/BannerContainer";
import ArticleMeta from "../../components/Article/ArticleMeta";
import ArticleTags from "../../components/Article/ArticleTags";
import ArticleButtons from "../../components/Buttons/ArticleButtons";
import LoadingPage  from "../../components/LoadingPage";
import { useEffect, useState } from "react";
import { TArticle } from "../../types/Article";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { getArticleBySlug } from "../../service/articleService";
import { errorHandler } from "../../service/handleError";
import { logoutUser } from "../../service/userService";
import MDEditor from "@uiw/react-md-editor";


function Article() {

    //state & slug
    const { state } = useLocation();
    const { slug } = useParams();

    //loading, article and setArticle
    const [ loading, setLoading ] = useState(false);
    const [ article, setArticle ] = useState<TArticle>(state || {});
    const { title, body, createdAt } = article;
    //navigate and authState
    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers } = authState;

    const handleTokenExpired = () => {
        alert("Token expired, Bruder!\n\nRedirecting to login");
        navigate("/login");
        setAuthState(logoutUser());
    }

    useEffect(() => {
        if (!slug  || state ) return;
        setLoading(true);

        //if we only have the slug, we get the article
        getArticleBySlug({slug})
        .then((article) => {
            setArticle(article);            
        })
        .catch((error) => { 
            errorHandler(error)
            const status = error.response?.status;
            if (status === 406) {
                handleTokenExpired()
            } else {
                navigate("/not-found", { replace: true })
            }
        })
        .finally(() => { setLoading(false); console.log(article.author);
        
         })
    
        
    },[slug, headers])
    return (
        loading ? <LoadingPage/> : !!article &&
        <div className="container article-page">
            <BannerContainer>
                <h1>{title}</h1>
            </BannerContainer>
            <ArticleMeta
                createdAt={createdAt}
                author={article.author}>
                <ArticleButtons article={article}  setArticle={setArticle}/>
            </ArticleMeta>
            <ContainerRow addClass={"article-cont"}>
                <div className="col-12 article-body">
                    {body && <MDEditor.Markdown source={body}/>}
                </div>
                <div className="col-12">
                    <ArticleTags tagList={article.tagList}/>
                </div>
                <div className="col-12">
                    <ArticleMeta
                    bottom={true}
                    createdAt={createdAt}
                    author={article.author}>
                    </ArticleMeta>
                </div>
            </ContainerRow>
            <Outlet/>
        </div> 
    );
}
export default Article;