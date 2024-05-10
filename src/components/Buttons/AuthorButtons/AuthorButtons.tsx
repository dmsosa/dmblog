        import { Link, useNavigate } from "react-router-dom";
        import { TAuthContext, useAuth } from "../../../context/AuthContext";
        import { deleteArticleBySlug, putBackgroundColor, putEmoji, putFontColor } from "../../../service/articleService";
        import { TArticle } from "../../../types/Article";
        import { ChangeEvent, useState } from "react";
        import { errorHandler } from "../../../service/handleError";
        import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

        function AuthorButtons({
            title, 
            body, 
            description, 
            tagList, 
            slug, 
            fontColor,
            backgroundColor, 
            emoji,
            setArticleWithNewFields
        } : {
            title: string,
            body: string,
            description: string,
            tagList: string[],
            slug: string | undefined,
            fontColor: string | null,
            backgroundColor: string | null
            emoji: string | null
            setArticleWithNewFields: (article: TArticle) => void
        }) {
            const { authState } = useAuth() as TAuthContext;
            const { headers, isAuth } = authState;
            const navigate = useNavigate();

            //is necessary to know the current article fields to display it to the user
            //however, states are created to be able to change them
            const [currentFontColor, setFontColor] = useState(fontColor ? fontColor : "black");
            const [currentColor, setColor ] = useState(backgroundColor ? backgroundColor : "#99ff33");
            const [currentEmoji, setEmoji] = useState(emoji ? emoji : "")

            slug = slug || "";

            //show pop ups
            const showPopup = (popupName: string) => {
                if (popupName === "colorPopup") {
                    document.getElementById("colorPopup")?.classList.toggle("show");
                } else if (popupName === "emojiPopup") {
                    document.querySelector(".emojiPopup")?.classList.toggle("show");
                }

            }

            const handleEmojiInput = (emoji: EmojiClickData, event: MouseEvent) => {
                //set emoji
                event.preventDefault();
                setEmoji(emoji.imageUrl);
                document.querySelector(".emojiPopup")?.classList.toggle("show");
                //see changes while changing the input
                const imgElement = document.querySelector("#banner>div>img");
                if (imgElement) {
                    imgElement.setAttribute("src", emoji.imageUrl)
                }            
            }

            //handle input color change
            const handleColorInput = (e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.name === "backgroundColorInput") {
                    //set  background Color
                    setColor(e.target.value);
                    //see changes while changing the input
                    const banner = document.getElementById("banner");
                    if (banner) {
                        const div = banner.firstChild as HTMLDivElement;
                        banner.style.backgroundColor = e.target.value;
                        div.style.background = `linear-gradient(0deg, ${e.target.value}, transparent)`
                    }
                } else if (e.target.name === "fontColorInput") {
                    //set  font Color
                    setFontColor(e.target.value);
                    //see changes while changing the input
                    const span = document.querySelector("#banner>div>span") as HTMLSpanElement;
                    if (span) {
                        span.style.color = e.target.value;
                    }
                }
            }
            //change the value of the field in the backend, and then setArticle
            const sendColorToBackend = () => {
                putBackgroundColor({slug, backgroundColor: currentColor, headers})
                .then(() => {
                    putFontColor({slug, fontColor: currentFontColor, headers})
                    .then((art) => setArticleWithNewFields(art))
                    .catch((error) => errorHandler(error))
                })
                .catch((error) => errorHandler(error))
            }
            const sendEmojiToBackend = () => {
                putEmoji({slug, emoji: currentEmoji, headers})
                .then((article) => setArticleWithNewFields(article))
            }
            const handleDelete = () => {
                if (!isAuth) return alert("You need to login first!");
                if (slug.length < 1) return console.log(`Article with slug ${slug} does not exists!`);
                var confirm = window.confirm("Are you sure to delete?");
                if (!confirm) { return;}
                deleteArticleBySlug({slug, headers})
                .then((message) =>
                    {   
                        alert(message);
                        navigate("/dmblog")
                    }
                ).catch((error) => {
                    console.log(error)
                })
            }



            return (
                <div className="author-buttons">
                    <Link
                    className="nav-link"
                    state={{ title, body, description, tagList }}
                    to={`/dmblog/editor/${slug}`}>
                        <button className="btn">Edit</button>
                    </Link>
                    <button className="btn btn-popup" name="emojiPopup" onClick={(e) => showPopup(e.currentTarget.name)}>
                        Change emoji
                    </button>
                    <EmojiPicker className="emojiPopup popupcontent" onEmojiClick={handleEmojiInput}/>
                    <button onClick={sendEmojiToBackend}>Confirm Emoji Change</button>
                    <button className="btn btn-popup" name="colorPopup" onClick={(e) => showPopup(e.currentTarget.name)}>Change background color</button>
                    <div id="colorPopup" className="popupcontent">
                        <input type="color" name="backgroundColorInput" value={currentColor} onChange={handleColorInput}></input>
                        <input type="color" name="fontColorInput" value={currentFontColor} onChange={handleColorInput}></input>
                        <button className="btn btn-primary" onClick={sendColorToBackend}>Confirm</button>
                    </div>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            )
        }

        export default AuthorButtons;