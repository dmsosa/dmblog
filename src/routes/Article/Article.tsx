import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ColContent from "../../components/ColContent";
import ContainerRow from "../../components/ContainerRow";
import CommentSection from "./CommentSection";
import BannerContainer from "../../components/BannerContainer";
import { useEffect, useState } from "react";
import { TArticle } from "../../types/Article";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import ArticleMeta from "../../components/ArticleMeta";
import ArticleTags from "../../components/ArticleTags";
import { getArticleBySlug } from "../../service/articleService";

function Article() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [ article, setArticle ] = useState(state || {});
    const { title, description, body, createdAt, tagList, author } = article || {};


    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth } = authState;

    const { slug } = useParams();

    useEffect(() => {
        if (state) return;
        if (!slug) return;
        getArticleBySlug({slug: slug, headers: headers, username: author.username})
        .then((articleData) => setArticle(articleData))
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
            <ArticleButtons/>
            </ArticleMeta>
            <ContainerRow addClass={"articlecont"}>
                {body && <Markdown>{body}</Markdown>}
                <ArticleTags/>
                <div className="row">
                    <ArticleMeta
                    createdAt={createdAt}
                    author={author}>
                        <ArticleButtons/>
                    </ArticleMeta>
                </div>
            </ContainerRow>

            <Outlet/>
        </div>
    );
}
export default Article;