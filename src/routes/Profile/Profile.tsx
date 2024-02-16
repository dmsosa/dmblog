import { useState } from "react";
import ContainerRow from "../../components/ContainerRow";
import ProfileArticles from "./ProfileArticles";
import ProfileFavArticles from "./ProfileFavArticles";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import useArticle from "../../hooks/useArticle";
import { useParams } from "react-router-dom";

function Profile() {
    const { username } = useParams();
    const { authState } = useAuth() as TAuthContext;
    const { headers, loggedUser } = authState;
    const { articles, articlesCount, setArticlesData,
        favArticles, isLoading } = useArticle( { 
            location: "author", 
            username: username || "", 
            headers: headers,
            tabName: "",
            tagName: ""
        });

        const handleChange = () => {

        }

    return isLoading ? (<h1>Loading author's articles</h1>) : (
        <div className="profile-cont">
        <ContainerRow>
            <h1>UserInfo</h1>
        </ContainerRow>
        <div className="row">
            <ProfileArticles 
            headers={headers}
            username={username || ""}
            articles={articles}
            articlesCount={articlesCount}
            isLoading={isLoading}
            setArticles={setArticlesData}/>
            <ProfileFavArticles 
            headers={headers}
            username={username || ""}
            articles={articles}
            isLoading={isLoading}
            setArticles={setArticlesData}/>
        </div>
    </div>
    )

  
}


export default Profile;