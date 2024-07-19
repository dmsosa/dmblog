import { useEffect, useState } from "react";
import { getProfileImage } from "../../service/userService";
import {  AxiosResponse } from "axios";
import { errorHandler } from "../../service/handleError";

const defaultImages = ["apple", "pear", "pineapple", "banana", "broccoli", "cucumber", "carrot", "orange", "cheese", "coconut", "avocado", "corn", "strawberry", "peach", "aubergine"];
const imagesRoute = "/dmblog/src/assets/img/profile/";

function Avatar({ image, username } : {image: string, username: string } ) {

    const [ source, setSource ] = useState("");
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        getProfileImage({image})
        .then((res: AxiosResponse) => {
                const profileImage = res.data;
                if (profileImage === null) {
                    setSource(imagesRoute + "apple.svg");
                } else {
                    if (defaultImages.includes(profileImage)) {
                        setSource(imagesRoute + profileImage + ".svg");
                    } else {
                        setSource(profileImage);
                    }
                }
            })
        .finally(() => {setLoading(false)})
    }, [source]);

    return (
        <div className="avatar">
            <img 
                alt={`${username}'s profile image`}
                src={source}>
            </img>
        </div>
    )
}

export default Avatar;