import {  Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import BannerContainer from "../../components/BannerContainer";
import ArticleTags from "../../components/Article/ArticleTags";
import { useEffect, useState } from "react";
import { TArticle } from "../../types/Article";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { getArticle } from "../../service/articleService";
import { ApiError } from "../../service/errorHandler";
import { logoutUser } from "../../service/userService";
import MDEditor from "@uiw/react-md-editor";
import ArticleSection from "../../components/Article/ArticleMeta/ArticleSection";

function Article() {
  //state & slug
  const { state } = useLocation();
  const { slug } = useParams();

  //loading, article and setArticle
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<TArticle>(state || {});
  const { title, body, fontColor, backgroundColor, emoji } = article;

  //navigate and authState
  const navigate = useNavigate();
  const {  setAuthState } = useAuth() as TAuthContext;

  //use Effect
  useEffect(() => {
    if (!slug || state) return;
    setLoading(true);

    getArticle({ slug })
      .then((article) => {
        setArticle(article);
      })
      .catch((error: ApiError) => {
        if (error.getStatusCode() === 406) {
          alert("Token expired, please login again!");
          setAuthState(logoutUser());
          navigate("/");
        } else  {
          navigate("/not-found", { replace: true });
        };
      })
      .finally(() => setLoading(false));
  
  }, [slug, navigate, setAuthState, state]);

  return loading ? 
    <div>Loading</div>
    :
    !!article && (
      <div className="container article-page">
        <div className="row">
          <BannerContainer
            title={title}
            backgroundColor={backgroundColor}
            fontColor={fontColor}
            emoji={emoji}
          ></BannerContainer>
        </div>
        <div className="row">
          <ArticleSection article={article} setArticle={setArticle} />
        </div>
        <div className="row">
          <div className="col-12 article-body">
            {body && <MDEditor.Markdown source={body} />}
          </div>
          <div className="col-12">
            <ArticleTags tagList={article.tagList} />
          </div>
        </div>
        <Outlet />
      </div>
    )
  ;
}
export default Article;
