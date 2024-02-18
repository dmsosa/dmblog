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
    image: "",
    bio: "",
    followersCount: 0, 
    followingCount: 0,
    createdAt: null,
    updatedAt: null
}

const initAuthor2 = {
    id: null,
    username: "author22",
    email: "",
    password: "",
    bio: "",
    image: "",
    followersCount: 0, 
    followingCount: 0,
    createdAt: null,
    updatedAt: null
}


const initArticle: TArticle = {
    id: null,
    userId: null,
    title: "title",
    author: initAuthor,
    description: "",
    body: "<h1>Hello arti</h1>",
    slug: "",
    tagList: [],
    isFav: false,
    favoritesCount: 0,
    createdAt: null,
    updatedAt: null
}

const initArticle2: TArticle = {
    id: null,
    userId: null,
    title: "title",
    author: initAuthor2,
    description: "",
    body: "<h1>Hello arti</h1>",
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
    const { title, description, body, createdAt, author, tagList } = article || {};
    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth } = authState;
    const { slug } = useParams();

    useEffect(() => {
        console.log("article ", article)
        if (state) return;
        getArticleBySlug({slug: slug || "", headers: headers })
        .then((articleData) => {
            console.log("artData", articleData)
            setArticle(articleData)})
        .catch((error) => {
            console.error(error);
            navigate("/not-found", { replace:true })
        });

    }, [slug, headers, isAuth, state, navigate])


    return (
        <div className="article-page">
            <BannerContainer>
                <h1>{title}</h1>
            </BannerContainer>
            <ArticleMeta
                createdAt={createdAt}
                author={author}>
                <ArticleButtons article={article}  setArticle={setArticle}/>
            </ArticleMeta>
            <ContainerRow addClass={"articlecont"}>
                {body && <Markdown options={{ forceBlock:true }}>{body}</Markdown>}
                <ArticleTags tagList={article.tagList}/>
                <div className="row">
                    <ArticleMeta
                    createdAt={createdAt}
                    author={author}>
                        <ArticleButtons article={article} setArticle={setArticle}/>
                    </ArticleMeta>
                </div>
            </ContainerRow>
            <Outlet/>
        </div>
    );
}
export default Article;