import ArticleEditor from "../components/Article/ArticleEditor/ArticleEditor";
import ContainerRow from "../components/ContainerRow";

function ArticleEditorPage() {
  return (
    <div className="editor-page">
      <ContainerRow>
        <ArticleEditor />
      </ContainerRow>
    </div>
  );
}

export default ArticleEditorPage;
