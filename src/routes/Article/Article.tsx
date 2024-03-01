import { Outlet, useLocation, useParams } from "react-router-dom";
import ContainerRow from "../../components/ContainerRow";
import BannerContainer from "../../components/BannerContainer";
import ArticleMeta from "../../components/Article/ArticleMeta";
import ArticleTags from "../../components/Article/ArticleTags";
import ArticleButtons from "../../components/Buttons/ArticleButtons";
import Markdown from "markdown-to-jsx";
import useArticleBySlug from "../../hooks/useArticleBySlug";
import LoadingPage  from "../../components/LoadingPage";
import { useEffect } from "react";


function Article() {

    const { state } = useLocation();
    const { slug } = useParams();
    const { loading, article, setArticle } = useArticleBySlug({slug, state});
    const { title, description, body, tagList, createdAt, author } = article;
    useEffect(() => {

    }, [article])
    return (
        loading ? <LoadingPage/> : article && author ?
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
                        <ArticleButtons article={article}  setArticle={setArticle}/>
                    </ArticleMeta>
                </div>
            </ContainerRow>
            <Outlet/>
        </div> : <LoadingPage />
    );
}
export default Article;