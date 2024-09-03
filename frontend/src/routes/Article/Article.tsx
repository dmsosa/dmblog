import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ContainerRow from "../../components/ContainerRow";
import BannerContainer from "../../components/BannerContainer";
import ArticleMeta from "../../components/Article/ArticleMeta";
import ArticleTags from "../../components/Article/ArticleTags";
import ArticleButtons from "../../components/Buttons/ArticleButtons";
import LoadingPage from "../../components/LoadingPage";
import { useEffect, useState } from "react";
import { TArticle } from "../../types/Article";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { getArticle } from "../../service/articleService";
import { createApiError } from "../../service/errorHandler";
import { logoutUser } from "../../service/userService";
import MDEditor from "@uiw/react-md-editor";
import { AxiosError } from "axios";

function Article() {
  //state & slug
  const { state } = useLocation();
  const { slug } = useParams();

  //loading, article and setArticle
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<TArticle>(state || {});
  const [error, setError] = useState<string | null>(null);
  const { title, body, fontColor, backgroundColor, emoji } = article;
  const [backgroundImage, setBackgroundImage] = useState("");

  //navigate and authState
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth() as TAuthContext;
  const { headers } = authState;

  //Css styles

  const backgroundStyles = {
    color: fontColor || "#000D1C",
    backgroundColor: backgroundColor || "#99ff33",
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundPosition: "top",
    backgroundSize: "45%",
    backgroundRepeat: "no-repeat",
    display: "block",
    height: "25rem",
  };

  //use Effect
  useEffect(() => {
    if (!slug || state) return;
    setLoading(true);

    const handleTokenExpired = () => {
      alert("Token expired, Bruder!\n\nRedirecting to login");
      navigate("/dmblog/login");
      setAuthState(logoutUser());
    };

    getArticle({ slug })
      .then((article) => {
        setArticle(article);
      })
      .catch((error) => {
        const apiError = createApiError(error);
        const status = apiError.getStatusCode();
        if (status === 406) {
          handleTokenExpired();
        } else if (status === 404) {
          navigate("/dmblog/not-found", { replace: true });
        } else if (status === 500) {
          const apiError = error as AxiosError;
          setError(apiError.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  
  }, [slug, headers, navigate, setAuthState, state]);

  return loading ? (
    <LoadingPage />
  ) : error ? (
    <div>An error ocurred {error} </div>
  ) : (
    !!article && (
      <div className="container article-page">
        <BannerContainer
          title={title}
          backgroundStyles={backgroundStyles}
          emoji={emoji}
        ></BannerContainer>
        <ArticleMeta author={article.author}>
          <ArticleButtons article={article} setArticle={setArticle} />
        </ArticleMeta>
        <ContainerRow addClass={"article-cont"}>
          <div className="col-12 article-body">
            {body && <MDEditor.Markdown source={body} />}
          </div>
          <div className="col-12">
            <ArticleTags tagList={article.tagList} />
          </div>
          <div className="col-12">
            <ArticleMeta bottom={true} author={article.author}></ArticleMeta>
          </div>
        </ContainerRow>
        <Outlet />
      </div>
    )
  );
}
export default Article;
