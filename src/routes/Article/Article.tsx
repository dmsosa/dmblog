import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ContainerRow from "../../components/ContainerRow";
import BannerContainer from "../../components/BannerContainer";
import { useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import ArticleMeta from "../../components/Article/ArticleMeta";
import ArticleTags from "../../components/Article/ArticleTags";
import { getArticleBySlug } from "../../service/articleService";
import ArticleButtons from "../../components/Buttons/ArticleButtons";
import Markdown from "markdown-to-jsx";
import { TArticle } from "../../types/Article";
import { TUser } from "../../types/User";

const initAuthor: TUser = {
    id: null,
    username: "author",
    email: "",
    password: "",
    image: null,
    bio: null,
    followersCount: 0, 
    followingCount: 0,
    followers: [],
    following: [],
    createdAt: null,
    updatedAt: null
}
const initArticle: TArticle = {
    id: null,
    userId: null,
    title: "",
    author: initAuthor,
    description: "",
    body: "",
    slug: "",
    tagList: [],
    isFav: false,
    favoritesCount: 0,
    createdAt: null,
    updatedAt: null
}
function Article() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [ article, setArticle ] = useState<TArticle>(state || initArticle);
    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth } = authState;
    const { slug } = useParams();

    useEffect(() => {
        if (state) return;
        getArticleBySlug({slug: slug || "", headers: headers })
        .then((articleData) => {
            setArticle(articleData)})
        .catch((error) => {
            console.error(error);
            navigate("/not-found", { replace:true })
        });
    }, [slug, headers, isAuth, state, navigate])


    return (
        <div className="article-page">
            <BannerContainer>
                <h1>{article.title}</h1>
            </BannerContainer>
            <ArticleMeta
                createdAt={article.createdAt}
                author={article.author}>
                <ArticleButtons article={article} setArticle={setArticle}/>
            </ArticleMeta>
            <ContainerRow addClass={"articlecont"}>
                {article.body && <Markdown options={{ forceBlock:true }}>{article.body}</Markdown>}
                <ArticleTags tagList={article.tagList}/>
                <div className="row">
                    <ArticleMeta
                    createdAt={article.createdAt}
                    author={article.author}>
                        <ArticleButtons article={article} setArticle={setArticle}/>
                    </ArticleMeta>
                </div>
            </ContainerRow>
            <Outlet/>
        </div>
    );
}
export default Article;