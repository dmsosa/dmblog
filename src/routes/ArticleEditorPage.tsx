import ArticleEditor from "../components/ArticleEditor.tsx/ArticleEditor";
import ContainerRow from "../components/ContainerRow";

function ArticleEditorPage() {
    return(
        <div className="editor-page">
            <ContainerRow >
                <div className="col">
                    <ArticleEditor/>
                </div>
            </ContainerRow>
        </div>

    )
}

export default ArticleEditorPage;