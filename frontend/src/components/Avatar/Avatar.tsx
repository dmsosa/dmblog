import { useEffect, useState } from "react";
import LoadingSquare from "../Widgets/LoadingSquare";

function    Avatar({ imageUrl, username } : {imageUrl: string, username: string } ) {

    const [ source, setSource ] = useState("");
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (!imageUrl || imageUrl.length < 1) {
            setSource("https://dmblogbucket.s3.eu-west-2.amazonaws.com/profile/apple.svg");
        } else {
            setSource(imageUrl);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1500);   
    }, []);

    return (
        loading ? 
        <LoadingSquare /> :
        <div className="avatar">
            <img 
                alt={`${username}'s profile image`}
                src={source}>
            </img>
        </div>
    )
}

export default Avatar;