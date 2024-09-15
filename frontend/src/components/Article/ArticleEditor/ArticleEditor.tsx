import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import FormFieldset from "../../FormFieldset";

import {
  getArticle,
  putArticle
} from "../../../service/articleService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { TArticle } from "../../../types/Article";
import MDEditor, { ContextStore } from "@uiw/react-md-editor";
import ErrorMessages from "./ErrorMessages";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { ApiError } from "../../../service/errorHandler";

//Custom types
type TForm = {
  articleId: string;
  userId: string;
  title: string;
  description: string;
  body: string;
  backgroundColor: string;
  fontColor: string;
  emoji: string;
  tagList: string[];
};
const emptyForm = {
  articleId: "",
  userId: "",
  title: "",
  description: "",
  body: "",
  backgroundColor: "#99ff33",
  fontColor: "#333",
  emoji: "",
  tagList: [""],
};

//Component
function ArticleEditor() {
  const { state } = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [{ articleId, userId, title, description, body, backgroundColor, fontColor, emoji, tagList }, setForm] = useState<TForm>(state || emptyForm);
  const [ image, setImage ] = useState<File | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { authState } = useAuth() as TAuthContext;
  const { headers, isAuth, loggedUser } = authState;

  //use Effect
  useEffect(() => {
    const redirect = () => {
      navigate("/dmblog", { replace: true, state: null });
    };
    if (!isAuth) {
      alert("You need to login first!");
      return redirect();
    };
    if (!slug) return;
    if (state) {
      
      //getBgImage
      return
    };

    getArticle({ slug })
      .then((article: TArticle) => {
        const { id, author, title, description, body, backgroundColor, fontColor, emoji,  tagList } = article;
        if (loggedUser.id !== author.id) redirect();

        let userId = loggedUser.id ? loggedUser.id.toString() : "";
        let articleId = id ? id.toString() : "";

        setForm({ articleId, userId, title, description, body, backgroundColor, fontColor, emoji, tagList });
      })
      .catch((error: ApiError) => {
        setErrorMessages([error.getMessage()])
      });

    return () => setForm(emptyForm);
  }, [
    headers,
    isAuth,
    loggedUser.id,
    navigate,
    slug,
    state,
    backgroundColor,
    emoji,
  ]);

  //handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> ,
  ) => {

    const name = e.target.name;
    const value = e.target.value;

    if (name === "backgroundImage") {
      const file = e.target.files ? e.target.files[0] : null;
      setImage(file);
    }
    else {
      setForm((prev: TForm) => ({ ...prev, [name]: value }));
    }
  };
  //handle markdown change
  const handleMarkdownChange = (
    value?: string | undefined,
    event?: ChangeEvent<HTMLTextAreaElement> | undefined,
    state?: ContextStore | undefined,
  ) => {
    event?.preventDefault();
    const name = state?.textarea ? state.textarea.name : "";
    if (!value) {
      value = "";
    }
    setForm((prev: TForm) => ({ ...prev, [name]: value }));
  };

  const handleEmojiChange = (emoji: EmojiClickData) => {
    setForm((prev: TForm) => ({ ...prev, "emoji": emoji.imageUrl }));
    setEmojiOpen(!emojiOpen);
  }
  //handle tag input
  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev: TForm) => ({ ...prev, tagList: value.split(/, | /) }));
  };


  //handle submit
  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("articleId", articleId);
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("body", body);
    formData.append("backgroundColor", backgroundColor);
    formData.append("fontColor", fontColor);
    formData.append("emoji", emoji);
    for (let i = 0; i < tagList.length ; i++ ) {
      formData.append("tagList[]", tagList[i]);
    }
    if (image) {
      formData.append("image", image);
    };
    putArticle({
      formData,
      artSlug: slug || null,
      headers,
    })
    .then((article: TArticle) => {
      navigate(`/dmblog/article/${article.slug}`);
    })
    .catch((error: ApiError) => {
      setErrorMessages([error.getMessage()]);
    });
    }
  return (
    <>
      {errorMessages.length > 0 && (
        <div className="col">
          <h1>Error!</h1>
        </div>
      )}
      <div className="col">
        <form className="article-form" onSubmit={handleSubmit}>
          <fieldset>
            <ErrorMessages errorList={errorMessages} />
            <FormFieldset
              id="title"
              type="text"
              name="title"
              placeholder="A wonderful title"
              value={title}
              changeHandler={handleChange}
              required={true}
              minLength={5}
              title="Article title"
            />
            <FormFieldset
              id="description"
              type="text"
              name="description"
              placeholder="A description of what your article is about"
              value={description}
              changeHandler={handleChange}
              required={true}
              minLength={10}
              title="Article description"
            />

            <MDEditor
              className="markdown-editor"
              textareaProps={{ rows: 8, name: "body" }}
              value={body}
              onChange={handleMarkdownChange}
            />
            {/* <ImageUploader onFilesSelected={setFile}/> */}
            <FormFieldset
              id="articleBackgroundColor"
              type="color"
              name="backgroundColor"
              value={backgroundColor}
              changeHandler={handleChange}
              required={false}
              title="Background color"
            />
            <FormFieldset 
              id="fontColor"
              type="color"
              name="fontColor"
              value={fontColor}
              changeHandler={handleChange}
              required={false}
              title="Font Color"
            />
            <div onClick={() => setEmojiOpen(!emojiOpen)}>Select Emoji:</div>
            <EmojiPicker
              onEmojiClick={handleEmojiChange}
              open={emojiOpen}
              emojiStyle={EmojiStyle.TWITTER}
              theme={Theme.DARK}
            />
            <div className="fieldset-div">
              <label></label>
              <input 
              type="file"
              name="backgroundImage"
              onChange={handleChange}
              />
            </div>
            <FormFieldset
              id="tags"
              type="text"
              name="tags"
              placeholder="Put some tags into it!"
              value={tagList.toLocaleString()}
              changeHandler={handleTagChange}
              required={false}
              title="Article tags"
            />

            <button className="btn btn-form" type="submit">
              {slug ? "Update Article" : "Post Article"}
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
export default ArticleEditor;
